import Image from "next/image";
import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Header } from "@components/Header/Header";
import { MainLayout } from "@components/layouts/MainLayout/MainLayout";
import { NavLink } from "@components/NavLink/NavLink";
import { WorkTitleSection } from "@components/pages/works/WorkTitleSection/WorkTitleSection";
import { SectionImage } from "@components/sections/SectionImage/SectionImage";
import { SectionMainTitle } from "@components/sections/SectionMainTitle/SectionMainTitle";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import GRADIENTS from "@lib/gradients";

export default function CaptchaSolver() {
  return (
    <MainLayout
      preContent={
        <>
          <BackgroundLines
            makeGradient={GRADIENTS.captcha}
            height="66vh"
            absolute
          />
          <Header activeHeight="5vh" goHome>
            <NavLink name="Overview" to="overview" />
            <NavLink name="Data" to="data" />
            <NavLink name="Training" to="training" />
            <NavLink name="Results" to="results" />
            <NavLink name="Reflexion" to="reflexion" />
          </Header>
        </>
      }
    >
      <WorkTitleSection title="Captcha Solver" />
      <section id="overview">
        <SectionImage
          image={{
            src: "/images/amazoncaptcha.png",
            alt: "ml captcha solves",
            width: 1718,
            height: 868,
          }}
          order={0}
        >
          <SectionTitle
            title="Overview"
            subtitle="Amazon Captcha Project"
            tags={["Tensorflow", "GCP", "OpenCV", "Python"]}
            fade
          />
          <p>
            This project involved creating a machine learning model that could
            solve Amazon&apos;s six-character captcha. The project required a
            lot of research, image transformation, and machine learning skills.
            The project was challenging, but it taught me a lot about image
            processing and neural networks.
          </p>
          {/* <div style={{ display: "flex", gap: "1.5rem" }}>
            <SiTensorflow size={50} />
            <SiGooglecloud size={50} />
            <SiPython size={50} />
          </div> */}
        </SectionImage>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.captcha} height={100} />
      <section id="data">
        <SectionMainTitle title="Development" />
        <SectionTitle title="Data" subtitle="Generating Captchas" fade />
        <p>
          One of the biggest challenges was collecting enough data to train the
          machine learning model. I decided to create a captcha generator that
          could automatically label as it created the captchas. I had to learn
          about image transformations, noise and randomness, and character
          merging to create something that was pretty close to Amazon&apos;s
          six-character captchas.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h4>Generated (200x70)</h4>
            <Image
              src="/images/example_gen_captcha.png"
              alt="example generated captcha"
              width={200}
              height={70}
              style={{ borderRadius: "0.5rem", marginRight: "3rem" }}
            />
          </div>
          <div>
            <h4>Real (200x70)</h4>
            <Image
              src="/images/example_real_captcha.png"
              alt="example real captcha"
              width={200}
              height={70}
              style={{ borderRadius: "0.5rem" }}
            />
          </div>
        </div>
      </section>
      <section id="training">
        <SectionTitle
          title="Training"
          subtitle="Developing a Neural Network"
          fade
        />
        <p>
          Training the model was a long process that involved a lot of trial and
          error. I first implemented the base five-character model, and then
          gradually generated more and more images while scaling the model up to
          six characters. I used hyperparameter tuning in order to find the best
          model. The model had a lot of difficulties with warped characters, but
          eventually learned to recognize them.
        </p>
      </section>
      <section id="results">
        <SectionTitle
          title="Results"
          subtitle="Model Performance on Real Captchas"
          fade
        />
        <p>
          Validating the model&apos;s accuracy was a critical step in the
          project. At first, I tried to train the model with a mixture of
          generated and real Amazon captchas, but the ratio was off, and the
          model was learning more from the generated ones. Eventually, I
          pre-trained the model only on the generated captchas and fine-tuned it
          on the real captchas, resulting in 93% accuracy on validation real
          Amazon captchas.
        </p>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.captcha} height={100} />
      <section id="reflexion">
        <SectionMainTitle title="Conclusion" />
        <SectionTitle
          title="Reflexion"
          subtitle="Lessons Learned and Skills Gained"
          fade
        />
        <p>
          Overall, this project was a challenging but rewarding learning
          experience. I gained skills in image processing, neural networks, and
          machine learning. The project taught me to be patient and persistent,
          and to never give up on a difficult problem. The Amazon captcha
          project will always be a highlight of my portfolio.
        </p>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.captcha} height="60vh" />
    </MainLayout>
  );
}
