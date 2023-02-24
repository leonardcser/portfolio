import { Award } from "@components/Award/Award";
import { ResponsiveSplitCols } from "@components/ResponsiveSplitCols/ResponsiveSplitCols";
import { SectionCodeBlock } from "@components/sections/SectionCodeBlock/SectionCodeBlock";
import { SectionImage } from "@components/sections/SectionImage/SectionImage";
import { SectionMainTitle } from "@components/sections/SectionMainTitle/SectionMainTitle";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import { AUTOSCOUT24_EXAMPLE_SHORT } from "@lib/codeSnippets";

export const WorksSection: React.FC = () => {
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
        <SectionImage
          image={{
            src: "/gifs/scrapeout.gif",
            alt: "scrapeout homepage website",
            width: 1194,
            height: 720,
          }}
          order={1}
          href="/works/scrapeout"
        >
          <SectionTitle
            title="Scrapeout"
            subtitle="Works"
            tags={[
              "Typescript",
              "SASS",
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
        </SectionImage>
        <SectionImage
          image={{
            src: "/images/amazoncaptcha.png",
            alt: "ml captcha solves",
            width: 1718,
            height: 868,
          }}
          order={0}
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
        </SectionImage>
        <SectionCodeBlock
          codeBlockProps={{
            ...AUTOSCOUT24_EXAMPLE_SHORT,
            style: { fontSize: "0.9rem" },
          }}
          order={1}
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
        </SectionCodeBlock>

        {/* <SectionImage
        image={{
          src: "/images/photop.png",
          alt: "photography portfolio website",
        }}
        order={0}
      >
        <SectionTitle
          title="Photography Portfolio"
          subtitle="Works"
          tags={["Typescript", "NextJS", "React", "SASS", "UI/UX"]}
          fade
        />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
          repellendus accusamus animi assumenda voluptate minus ipsa illo autem
          cum eaque, error porro impedit vero et? Ipsum modi minima laboriosam
        </p>
      </SectionImage> */}
        {/* <SectionImage
          image={{
            src: "/images/smarterhabits.png",
            alt: "habit tracker app",
            width: 3760,
            height: 2688,
          }}
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
        </SectionImage>
        <SectionImage
          image={{
            src: "/gifs/mazeGeneration.gif",
            alt: "maze generation gif",
            width: 1151,
            height: 676,
          }}
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
            This project pushed my limits with Java and OOP.
          </p>
        </SectionImage> */}
        <SectionImage
          image={{
            src: "/gifs/pacman.gif",
            alt: "pacman gif",
            width: 748,
            height: 720,
          }}
          order={0}
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
            of 2 for the Introduction to Programming (CS-107) course at EPFL.
            <br />
            It includes all ghosts and their AI, a map editor, a leaderboard
            system, custom menu and more.
          </p>
          <Award>
            1st Place EPFL
            <br />
            Award
          </Award>
        </SectionImage>
      </div>
    </section>
  );
};
