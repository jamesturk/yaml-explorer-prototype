import { useState } from "react";
import YAML from "yaml";
import { Octokit } from "@octokit/rest";
import FileList from "./FileList";
import FileDetail from "./FileDetail";
import FileEditor from "./FileEditor";
import {dataDir, githubToken} from "./config";


function App() {
  const [dirHandle, setDirHandle] = useState();
  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState();

  async function pickDirectory() {
    const dirHandle = await window.showDirectoryPicker();
    setDirHandle(dirHandle);
    let newFiles = {};
    for await (let [name, handle] of dirHandle) {
      let file = await handle.getFile();
      let fr = new FileReader();
      fr.onload = function (e) {
        newFiles[name] = {
          raw: fr.result,
          data: YAML.parse(fr.result),
          error: null,
        };
      };
      await fr.readAsText(file);
    }
    setFiles(newFiles);
  }

  async function loadFromGitHub() {
    const owner = "openstates";
    const repo = "people";
    const basePath = "data/nc/legislature";
    const octokit = new Octokit({auth: githubToken});
    const files = await octokit.repos.getContent({
      owner,
      repo,
      path: basePath,
    });
    let newFiles = {};
    for (let file of files.data) {
      const fileResponse = await octokit.repos.getContent({
        owner,
        repo,
        path: basePath + "/" + file.name,
        headers: {
          Accept: "application/vnd.github.v3.raw",
        },
      });
      newFiles[file.name] = {
        raw: fileResponse.data,
        data: YAML.parse(fileResponse.data),
        error: null,
      };
    }
    setFiles(newFiles);
  }

  function reparseYaml(event) {
    console.log("update", selectedFile, event.target.value);
    let newFiles = { ...files };
    newFiles[selectedFile].raw = event.target.value;
    try {
      newFiles[selectedFile].data = YAML.parse(event.target.value);
      newFiles[selectedFile].error = null;
    } catch (err) {
      newFiles[selectedFile].error = err.message;
    }
    setFiles(newFiles);
  }

  return (
    <div className="App">
      <h1>Person YAML Browser</h1>
      <input type="button" value="pick directory" onClick={pickDirectory} />
      <input type="button" value="load from GitHub" onClick={loadFromGitHub} />
      <div className="three-column">
        <FileList
          files={files}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <FileDetail file={files[selectedFile]} />
        <FileEditor file={files[selectedFile]} onChange={reparseYaml} />
      </div>
    </div>
  );
}

export default App;
