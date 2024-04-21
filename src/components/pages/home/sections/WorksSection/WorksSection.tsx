import { FaGithub } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { AutoPlayVideo } from "@components/AutoPlayVideo/AutoPlayVideo";
import { Award } from "@components/Award/Award";
import { ExternalLinkTag } from "@components/ExternalLinkTag/ExternalLinkTag";
import { ResponsiveSplitCols } from "@components/ResponsiveSplitCols/ResponsiveSplitCols";
import { ResponsiveMediaSplit } from "@components/sections/ResponsiveMediaSplit/ResponsiveMediaSpit";
import { SectionMainTitle } from "@components/sections/SectionMainTitle/SectionMainTitle";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import { SkeletonImage } from "@components/SkeletonImage/SkeletonImage";

export const WorksSection: React.FC = () => {
  let order = 1;
  return (
    <section id="works">
      <SectionMainTitle title="My Favorite Works" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5rem",
        }}
      >
        <ResponsiveMediaSplit
          media={
            <SkeletonImage
              fill
              src="/images/lakes.png"
              alt="greenland lake segmentation"
            />
          }
          mediaWidth={683}
          mediaHeight={717}
          order={order++ % 2}
        >
          <SectionTitle
            title="Greenland Supraglacial Lakes Detection"
            subtitle="Works"
            tags={["MLOps", "PyTorch", "DVC"]}
            extraTags={[
              <ExternalLinkTag
                key={0}
                title="GitHub"
                href="https://github.com/swiss-ai-center/giscup2023-resnet-unet"
                Icon={FaGithub}
              />,
              <ExternalLinkTag
                key={1}
                title="Read Paper"
                href="https://dl.acm.org/doi/10.1145/3589132.3629970"
                Icon={IoIosPaper}
              />,
            ]}
            fade
          />
          <p>
            This project was part of a ACM SIGSPATIAL competition. The goal was
            to segment supraglacial lakes in Greenland using satellite images.
            We worked in a team of 5 at{" "}
            <strong style={{ color: "red" }}>HEIG-VD</strong> and submitted two
            solutions, ranked 1st and 3rd.
          </p>
          <ResponsiveSplitCols style={{ gap: "1.5rem" }}>
            <Award yOffset={-12}>
              2023 ACM
              <br />
              SIGSPATIAL
              <br />
              1st Place
            </Award>
            <Award yOffset={-12}>
              2023 ACM
              <br />
              SIGSPATIAL
              <br />
              3rd Place
            </Award>
          </ResponsiveSplitCols>
        </ResponsiveMediaSplit>
        <ResponsiveMediaSplit
          media={
            <SkeletonImage
              fill
              src="/images/license_plate.png"
              alt="license plate detection"
            />
          }
          mediaWidth={1154}
          mediaHeight={1290}
          order={order++ % 2}
        >
          <SectionTitle
            title="Swiss License Plate Detection"
            subtitle="Works"
            tags={["MLOps", "PyTorch", "Kubernetes", "DVC"]}
            extraTags={[
              <ExternalLinkTag
                key={0}
                title="GitHub"
                href="https://github.com/swiss-ai-center/pytorch-license-plate-with-mlops"
                Icon={FaGithub}
              />,
            ]}
            fade
          />
          <p>
            This project was part of research into Machine Learning Operations
            (MLOps) at <strong style={{ color: "red" }}>HEIG-VD</strong>. It is
            comprised of two models: one for detecting the license plate and
            another for recognizing the characters. The key feature is a custom
            license plate generator in order to train on synthetic data.
          </p>
        </ResponsiveMediaSplit>
        <ResponsiveMediaSplit
          media={<AutoPlayVideo src="/videos/scrapeout.mp4" />}
          mediaWidth={1194}
          mediaHeight={720}
          order={order++ % 2}
          href="/works/scrapeout"
        >
          <SectionTitle
            title="Scrapeout"
            subtitle="Works"
            tags={[
              "Typescript",
              "SCSS",
              "UI/UX",
              "Django",
              "Terraform",
              "Docker",
              "AWS",
              "PostgreSQL",
              "Neo4j",
            ]}
            fade
            href="/works/scrapeout"
          />
          <p>
            Scrapeout is my most ambitious project to date. It has now become a
            full web tool that helps companies identify conflict of interest in
            their data in order to take more informed decisions.
          </p>
          <ResponsiveSplitCols style={{ gap: "1.5rem" }}>
            <Award>
              Hackathon
              <br />
              1st Place
            </Award>
            <Award>
              AWS
              <br />
              Certified
            </Award>
          </ResponsiveSplitCols>
        </ResponsiveMediaSplit>
        <ResponsiveMediaSplit
          media={
            <SkeletonImage
              fill
              src="/images/amazoncaptcha.jpg"
              alt="ml captcha solves"
            />
          }
          mediaWidth={1211}
          mediaHeight={612}
          order={order++ % 2}
          href="/works/captcha"
        >
          <SectionTitle
            title="Captcha Solver"
            subtitle="Works"
            tags={["Tensorflow", "GCP", "OpenCV", "Python"]}
            fade
            href="/works/captcha"
          />
          <p>
            The goal of this project was to create a neural network that could
            solve 6 character captchas from Amazon. I achieved an average
            accuracy of 93%.
          </p>
        </ResponsiveMediaSplit>
        {/* <SectionCodeBlock
          codeBlockProps={{
            ...AUTOSCOUT24_EXAMPLE_SHORT,
            style: { fontSize: "0.9rem" },
          }}
          order={order++ % 2}
          href="/works/autoscout24"
        >
          <SectionTitle
            title="AutoScout24 API"
            subtitle="Works"
            tags={["Selenium", "Python"]}
            fade
            href="/works/autoscout24"
          />
          <p>
            An API wrapper for the car listing website, AutoScout24. This
            project was a great way to learn about Python factories and
            abstractions.
          </p>
        </SectionCodeBlock> */}
        <ResponsiveMediaSplit
          media={<AutoPlayVideo src="/videos/SlitherIORL.mp4" />}
          mediaWidth={1255}
          mediaHeight={1010}
          order={order++ % 2}
        >
          <SectionTitle
            title="SlitherIO RL"
            subtitle="Works"
            tags={["Tensorflow", "Selenium", "OpenCV", "Python"]}
            fade
          />
          <p>
            The project was to create a neural network that could play the game
            SlitherIO. The agent was trained using A2C (actor to critic)
            reinforcement learning. The agent was able to collect food and avoid
            other snakes.
          </p>
        </ResponsiveMediaSplit>
        {/* <ResponsiveMediaSplit
          media={
            <SkeletonImage
              fill
              src="/images/smarterhabits.jpg"
              alt="habit tracker app"
            />
          }
          mediaWidth={3760}
          mediaHeight={2688}
          order={0}
        >
          <SectionTitle
            title="Habit Tracker App"
            subtitle="Works"
            tags={["Typescript", "ReactNative", "Expo", "UI/UX"]}
            fade
          />
          <p>
            The inspiration was to create a habit tracker app that would be able
            to track your daily activities and habits. Based on this data, it
            would find patterns and connections between your habits and
            activities.
          </p>
        </ResponsiveMediaSplit> */}
        {/* <ResponsiveMediaSplit
          media={
            <SkeletonImage
              fill
              src="/gifs/mazeGeneration.gif"
              alt="maze generation gif"
            />
          }
          mediaWidth={1151}
          mediaHeight={676}
          order={1}
        >
          <SectionTitle
            title="Terminal ASCII Engine"
            subtitle="Works"
            tags={["Java"]}
            fade
          />
          <p>
            An ASCII renderer that can be used to create apps and games in the
            terminal. In addition to the engine, I implemented sorting
            algorithms, a maze generation algorithm and the classic Snake game.
            This was the first project that I did outside of EPFL.
          </p>
        </ResponsiveMediaSplit> */}
        <ResponsiveMediaSplit
          media={<AutoPlayVideo src="/videos/pacman.mp4" />}
          mediaWidth={748}
          mediaHeight={720}
          order={order++ % 2}
          href="/works/pacman"
        >
          <SectionTitle
            title="Pac-Man"
            subtitle="Works"
            tags={["Java", "UI/UX", "EPFL"]}
            fade
            href="/works/pacman"
          />
          <p>
            Remake of the classic Pacman game. This project was done in a team
            of 2 for the Introduction to Programming (CS-107) course at{" "}
            <strong style={{ color: "red" }}>EPFL</strong>.
            <br />
            It includes all ghosts and their AI, a map editor, a leaderboard
            system, custom menu and more.
          </p>
          <Award>
            1st Place EPFL
            <br />
            Award
          </Award>
        </ResponsiveMediaSplit>
      </div>
    </section>
  );
};
