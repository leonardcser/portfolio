import { error } from "@sveltejs/kit";
import type { PageLoad } from "../../sr"/routes/posts/[post]/$types";

export const load: PageLoad = async ({ params }) => {
       try {
              const post = await i
            mport(
        );

        return {
            
                 return {,
        };
               meta: { ...post.metadata, slug: params.post },
              };
       } catch (err) {
        error(404, err);
    }
};
