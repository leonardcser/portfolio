import { Props as CodeBlockProps } from "@components/CodeBlock/CodeBlock";

export const AUTOSCOUT24_EXAMPLE: CodeBlockProps = {
  language: "python",
  filename: "search_example.py",
  code: `from auto24_api import Auto24API
from auto24_api.search import Filters, SearchQuery


def main() -> None:
    """
    The API is used in a context manager to ensure that the session is closed.
    The Filters class is used to define developer friendly filters for the
    search query
    """
    with Auto24API() as api:
        res = api.search_listings(
            SearchQuery(
                make=[Filters.MAKE.AUDI, Filters.MAKE.BMW, Filters.MAKE.VW],
                year_from=2014,
                year_to=None,
                km_from=None,
                km_to=60_000,
                price_from=7_500,
                price_to=20_000,
                hp_from=180,
                sorting=Filters.SORTING.HP_DESC,
                page_size=60,
            )
        )
        print(res)


if __name__ == "__main__":
    main()
`,
};

export const AUTOSCOUT24_EXAMPLE_SHORT: CodeBlockProps = {
  language: "python",
  filename: "search_example_short.py",
  code: `from auto24_api import Auto24API
from auto24_api.search import Filters, SearchQuery


def main() -> None:
    with Auto24API() as api:
        res = api.search_listings(
            SearchQuery(
                make=[Filters.MAKE.AUDI, Filters.MAKE.VW],
                year_from=2014,
                year_to=None,
                km_from=None,
                km_to=60_000,
                # ...
            )
        )
        print(res)

if __name__ == "__main__":
    main()
`,
};

export const AUTOSCOUT24_SEARCH_QUERY: CodeBlockProps = {
  language: "python",
  filename: "search_query.py",
  code: `@dataclass
class SearchQuery(AbstractQuery):
    """
    This class is used to define the query params that will be used in the request
    """
    vehicule_type: VehiculeType = VehiculeType.CAR
    make: Union[Make, list[Make]] = Make.ALL
    year_from: Union[None, int] = None
    year_to: Union[None, int] = None
    km_from: Union[None, int] = None
    km_to: Union[None, int] = None
    # ...

    def __post_init__(self) -> None:
        if isinstance(self.make, Make):
            self.make = [self.make]

        self._qv = QueryValidator(self)
        valid, error = self._qv.validate()
        if not valid:
            raise QueryParamsValidationError(error)
        # ...

    @property
    def VALIDATORS(self) -> list[Validator]:
        """
        This property is used to define the validators that will be applied to the
        class input params

        The validators are defined in the __annotations__ attribute of the class
        and are used to validate the input params of the class
        """
        VALS = [
            IsIn(key="year_from", min=1975, max=dt.datetime.now().year),
            # Here is interesting to mention that we can use the year_from value in
            # the min param of the year_to validator
            IsIn(key="year_to", min="year_from", max=dt.datetime.now().year),
            IsIn(key="km_from", min=0, max=500_000),
            IsIn(key="km_to", min="km_from", max=500_000),
            # ...
        ]
        # This assert is here to make sure that the validators are up to date
        assert len(self.__annotations__.keys()) == 19, (
            "Validators should be up to date with class input params "
            f"({len(self.__annotations__.keys())})"
        )
        return VALS

    @property
    def KEY_MAPPING(self) -> dict[str, str]:
        """
        This property is used to define the mapping between the class input params
        and the query params that will be used in the request
        """
        MAPPING = {
            "vehicule_type": "vehtyp",
            "make": "make",
            "year_from": "yearfrom",
            "year_to": "yearto",
            "km_from": "kmfrom",
            "km_to": "kmto",
            # ...
        }
        assert len(self.__annotations__.keys()) == len(
            MAPPING.keys()
        ), "Mapping keys should be up to date with class input params"
        return MAPPING
`,
};

export const AUTOSCOUT24_VALIDATOR: CodeBlockProps = {
  language: "python",
  filename: "query_validator.py",
  code: `@dataclass
class IsIn(Validator):
    """
    This class is used to validate that the input value is in a given range
    """
    min: Union[int, str]
    max: Union[int, str]

    def validate(self, cls: object, value: Union[None, int]) -> bool:
        """
        This method validates that the input value is in a given range and
        looks up the min and max values in the class if they are defined as
        strings
        """
        if value is None:
            return True

        min_repr = ""
        if isinstance(self.min, str):
            min_repr = f"{self.min}="
            self.min = getattr(cls, self.min) or 0  # <--- Lookup here

        max_repr = ""
        if isinstance(self.max, str):
            max_repr = f"{self.max}="
            self.max = getattr(cls, self.max) or 0  # <--- Lookup here

        if isinstance(value, int):
            if not self.min <= value <= self.max:
                self.error = (
                    f"'{self.key}' is out of range "
                    f"({min_repr}{self.min} <= "
                    f"{self.key}={value} <= "
                    f"{max_repr}{self.max})"
                )
                return False
            return True
`,
};
