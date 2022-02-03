import "./HomePage.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { UncontrolledCarousel } from "reactstrap";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {!isLoggedIn && (
        <>
          <div className="home-page-not-loggedin">
            <div className="first-container">
              <UncontrolledCarousel
                items={[
                  {
                    altText: "Get more done with Timex tasks.",
                    caption: "Get more done with Timex tasks.",
                    key: 1,
                    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                  },
                  {
                    altText: "Customize your tasks for any project.",
                    caption: "Customize your tasks for any project.",
                    key: 2,
                    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                  },
                  {
                    altText: "Save more time with streamlined workflows.",
                    caption: "Save more time with streamlined workflows.",
                    key: 3,
                    src: "https://images.unsplash.com/photo-1456574808786-d2ba7a6aa654?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=744&q=80",
                  },
                  {
                    altText: "Never miss a date with recurring tasks.",
                    caption: "Never miss a date with recurring tasks.",
                    key: 4,
                    src: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                  },
                ]}
              />
            </div>

            <hr />

            <div className="why-timex">
              <div className="why-timex-text">
                <h2>Why Timex?</h2>
                <p>
                  With Timex you can manage your time, organize your shedule.
                </p>
                <p>Make your resgistration and start to manage your time.</p>
              </div>

              <div className="why-timex-img">
                <img
                  src="https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="why timex?"
                />
              </div>
            </div>

            <hr />

            <div className="container-how-to-do">
              <img
                src="https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80"
                alt="calendar"
              />
              <div className="how-to-do">
                <h2>How to do it?</h2>
                <p>First register at the Timex</p>
                <p>After do the login </p>
                <p>
                  And then start to create a category and then create your
                  tasks!
                </p>
              </div>
            </div>

            <hr />

            <div className="plans">
              <h2>Bring your plans to life.</h2>
              <p>
                Plan, organize, and collaborate on any project with powerful
                task management that can be customized for every need.
              </p>
            </div>
          </div>
        </>
      )}

      {isLoggedIn && (
        <div className="home-loggedin">
          <div className="home-loggedin-img">
            {" "}
            <img
              src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80"
              alt="Plans"
            />
          </div>

          <div className="loggedin-plans">
            <h2>Bring your plans to life.</h2>
            <p>
              Plan, organize, and collaborate on any project with powerful task
              management that can be customized for every need.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
