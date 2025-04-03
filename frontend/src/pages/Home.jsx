import React, { useEffect, useState, version } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Share from "../components/Share";
import "./Home.css";

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // State to store selected language

  const [isEditModelShow, setIsEditModelShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      borderColor: "#555",
      color: "#fff",
      padding: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      color: "#fff",
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#333" : "#000",
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
    }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    // Filter only the required languages
    const filteredLanguages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "bash",
    ];

    const options = data
      .filter((runtime) => filteredLanguages.includes(runtime.language))
      .map((runtime) => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Update selected language state
    console.log("Selected language:", selectedOption);
  };

  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setProjects(data.projects);
        } else {
          toast.error(data.msg);
        }
      });
  };

  useEffect(() => {
    getProjects();
    getRunTimes();
  }, []);

  const createProj = () => {
    fetch(api_base_url + "/createProj", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName("");
          navigate("/editior/" + data.projectId);
        } else {
          toast.error(data.msg);
        }
      });
  };

  const deleteProject = (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/deleteProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            getProjects();
          } else {
            toast.error(data.msg);
          }
        });
    }
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = () => {
    fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsEditModelShow(false);
          setName("");
          setEditProjId("");
          getProjects();
        } else {
          toast.error(data.msg);
          setIsEditModelShow(false);
          setName("");
          setEditProjId("");
          getProjects();
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-4 mt-5'>
        <h3 className='text-xl sm:text-2xl flex items-center gap-2'>
          👋 <b>Hi, Coders</b>
        </h3>
        <div className='mt-4 sm:mt-0'>
          <button
            onClick={() => setIsCreateModelShow(true)}
            className='px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold transition-all hover:bg-blue-600 shadow-md'
          >
            Create Project
          </button>
        </div>
      </div>

      <div className='projects px-4 sm:px-10 md:px-20 lg:px-28 xl:px-36 mt-5 pb-10'>
        {projects && projects.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map((project, index) => (
              <div
                key={index}
                className='project w-full p-4 flex flex-col bg-[#0f0e0e] rounded-lg shadow-md'
              >
                <div
                  onClick={() => navigate("/editior/" + project._id)}
                  className='flex items-center gap-4 cursor-pointer'
                >
                  <img
                    className='w-24 h-20 object-cover rounded'
                    src={
                      project.projLanguage === "python"
                        ? "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png"
                        : project.projLanguage === "javascript"
                        ? "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                        : project.projLanguage === "cpp"
                        ? "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png"
                        : project.projLanguage === "c"
                        ? "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
                        : project.projLanguage === "java"
                        ? "https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png"
                        : project.projLanguage === "bash"
                        ? "https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png"
                        : "https://via.placeholder.com/130"
                    }
                    alt={project.projLanguage}
                  />
                  <div>
                    <h3 className='text-lg font-semibold text-white'>
                      {project.name}
                    </h3>
                    <p className='text-sm text-gray-400'>
                      {new Date(project.date).toDateString()}
                    </p>
                  </div>
                </div>

                <div className='flex justify-between mt-4'>
                  <button
                    className='px-4 py-2 text-white bg-blue-500 rounded-md transition hover:bg-blue-600'
                    onClick={() => {
                      setIsEditModelShow(true);
                      setEditProjId(project._id);
                      setName(project.name);
                    }}
                  >
                    Edit
                  </button>
                  {/* share button */}
                  <Share itemId={project._id} />
                  <button
                    onClick={() => deleteProject(project._id)}
                    className='px-4 py-2 text-white bg-red-500 rounded-md transition hover:bg-red-600'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-400'>No Project Found!</p>
        )}
      </div>

      {isCreateModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsCreateModelShow(false);
              setName("");
            }
          }}
          className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'
        >
          <div className='modelBox'>
            <h3 className='text-xl font-bold text-center'>Create Project</h3>
            <div className='inputBox'>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type='text'
                placeholder='Enter your project name'
              />
            </div>
            <Select
              placeholder='Select a Language'
              options={languageOptions}
              styles={customStyles}
              onChange={handleLanguageChange}
            />
            {selectedLanguage && (
              <>
                <p className='text-[14px] text-green-500 mt-2'>
                  Selected Language: {selectedLanguage.label}
                </p>
                <button
                  onClick={createProj}
                  className='btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2'
                >
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isEditModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsEditModelShow(false);
              setName("");
            }
          }}
          className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'
        >
          <div className='modelBox flex flex-col items-start rounded-xl p-[20px] w-[25vw] h-[auto] bg-[#0F0E0E]'>
            <h3 className='text-xl font-bold text-center'>Update Project</h3>
            <div className='inputBox'>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type='text'
                placeholder='Enter your project name'
                className='text-black'
              />
            </div>

            <button
              onClick={updateProj}
              className='btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2'
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
