import Image from "next/image";
import { Award } from "@components/Award/Award";
import { BackgroundLines } from "@components/BackgroundLines/BackgroundLines";
import { Cursor } from "@components/Cursor/Cursor";
import { Header } from "@components/Header/Header";
import { MainLayout } from "@components/layouts/MainLayout/MainLayout";
import { NavLink } from "@components/NavLink/NavLink";
import { SectionImage } from "@components/sections/SectionImage/SectionImage";
import { SectionMainTitle } from "@components/sections/SectionMainTitle/SectionMainTitle";
import { SectionTitle } from "@components/sections/SectionTitle/SectionTitle";
import { WorkTitleSection } from "@components/works/WorkTitleSection/WorkTitleSection";
import GRADIENTS from "@lib/gradients";
// import { FaHome } from "react-icons/fa";

export default function Pacman() {
  return (
    <MainLayout
      preContent={
        <>
          <BackgroundLines
            makeGradient={GRADIENTS.pacman}
            height="66vh"
            absolute
          />
          <Header activeHeight="5vh" goHome>
            <NavLink name="Overview" to="overview" />
            <NavLink name="Collaboration" to="collaboration" />
            <NavLink name="Design" to="design" />
            <NavLink name="Challenges" to="challenges" />
            <NavLink name="Features" to="features" />
            <NavLink name="Reflexion" to="reflexion" />
          </Header>
        </>
      }
    >
      <WorkTitleSection title="Pac-Man" />
      <section id="overview">
        {/* <SectionTitle
          title="Overview"
          subtitle="First Place Winning Project"
          tags={["Java", "UI/UX", "EPFL"]}
          fade
        />
        <p>
          As part of the CS-107 EPFL introduction to programming course, I
          worked with a teammate to recreate the classic Pac-Man game in Java.
          We competed against approximately 300 teams and were proud to win
          first place.
          <br />
          This project helped me learn Java and object-oriented programming,
          along with other valuable skills, such as collaboration,
          problem-solving, and project management.
        </p>
        <Award>
          1st Place EPFL
          <br />
          Award
        </Award> */}
        <SectionImage
          image={{
            src: "/gifs/pacman.gif",
            alt: "pacman gif",
            width: 748,
            height: 720,
          }}
          order={0}
        >
          <SectionTitle
            title="Overview"
            subtitle="First Place Winning Project"
            tags={["Java", "UI/UX", "EPFL"]}
            fade
          />
          <p>
            As part of the CS-107 EPFL introduction to programming course, I
            worked with a teammate to recreate the classic Pac-Man game in Java.
            We competed against approximately 300 teams and were proud to win
            first place.
          </p>
          <p>
            This project helped me learn Java and object-oriented programming,
            along with other valuable skills, such as collaboration,
            problem-solving, and project management.
          </p>
          <Award>
            1st Place EPFL
            <br />
            Award
          </Award>
        </SectionImage>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.pacman} height={100} />
      <section id="collaboration">
        {/* <SectionTitle
          title="Development"
          subtitle="Working with Git and Documentation"
        /> */}
        <SectionMainTitle title="Development" />
        <SectionTitle
          title="Collaboration"
          subtitle="Developing a Pac-Man Game"
          fade
        />
        <p>
          The project began with a base code repository that contained
          abstracted JavaFX functions, along with a document that outlined the
          initial code and steps to implement the base features.
        </p>
        <p>
          My teammate and I worked together to delegate the work and add
          extensions to the game. We used Git for collaboration and created a
          Google doc to gather helpful resources and links.
        </p>
      </section>
      <section id="design">
        {/* TODO: Make this flex responsive */}
        <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <Image
            src="/images/pacmanArcade.png"
            alt="pacman arcade"
            width={129}
            height={242}
          />
          <div>
            <SectionTitle
              title="Design"
              subtitle="Arcade-inspired Design Elements"
              fade
            />
            <p>
              For the game&apos;s design, we opted to use custom assets that
              originated from the original game graphics. I added a unique field
              to the game by incorporating an arcade-inspired design with small
              details like glow, retro arcade style, VHS lines, and a joystick
              that moves based on user input. These elements created an
              immersive and nostalgic gaming experience.
            </p>
          </div>
        </div>
      </section>
      <section id="challenges">
        <SectionTitle
          title="Challenges"
          subtitle="Technical Challenges and Innovations"
          fade
        />
        <p>
          Several technical challenges arose during the project, including
          implementing the window stack-based system, creating a smooth camera
          that interpolates to its desired location, and re-adapting the sound
          system to our use.
        </p>
        <p>
          Additionally, implementing the ghosts&apos; AI was one of the most
          interesting and innovative aspects of the project, as it gave each
          ghost its own personality.
        </p>
        <Image
          src="/images/deadPacman.png"
          alt="pacman animation"
          width={168}
          height={14}
        />
      </section>
      <section id="features">
        <SectionTitle
          title="Features"
          subtitle="Key Elements and Additions"
          fade
        />
        <p>
          The main features of the game included a player GUI, leaderboard,
          ghost algorithms, and a score/points system. In addition, we added
          several extensions to the game, such as glow, wall design, arcade
          elements, a bonus map, new ghosts, a magnet effect for power pellets,
          tunnels, improved graphics, intro music, sound effects, a pellet
          counter, time tracker, FPS display, menu, difficulty options,
          performance options, camera options, camera shake, help menu with
          multiple pages, quit game, pause game, and end game. These additions
          made the game more engaging and enjoyable for players.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Image
            src="/images/spc_main_menu.png"
            alt="pacman animation"
            width={400}
            height={400}
          />
          <Image
            src="/images/spc_settings.png"
            alt="pacman animation"
            width={400}
            height={400}
          />
          <Image
            src="/images/spc_help.png"
            alt="pacman animation"
            width={400}
            height={400}
          />
          <Image
            src="/images/spc_help_ghosts.png"
            alt="pacman animation"
            width={400}
            height={400}
          />
          <Image
            src="/images/spc_help_pts.png"
            alt="pacman animation"
            width={400}
            height={400}
          />
          <Image
            src="/images/spc_leaderboard.png"
            alt="pacman animation"
            width={400}
            height={400}
          />
        </div>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.pacman} height={100} />
      <section id="reflexion">
        <SectionMainTitle title="Conclusion" />
        <SectionTitle title="Reflexion" subtitle="Learning and Growth" fade />
        <p>
          Overall, this project was a success that allowed me to learn a lot
          about programming and game development. It was an opportunity to push
          my limits with extensions, adding functionality, and designing
          elements that added to the gaming experience.
        </p>
        <p>
          This project helped me improve my skills in Java, Git, collaboration,
          problem-solving, and project management. It was a challenging and
          rewarding experience that I will always remember.
        </p>
      </section>
      <BackgroundLines makeGradient={GRADIENTS.pacman} height="60vh" />
    </MainLayout>
  );
}
