import { useState } from "react";
import YAML from "yaml";
import FileList from "./FileList";
import FileDetail from "./FileDetail";
import FileEditor from "./FileEditor";

const dataDir = "/Users/james/code/os/people/data/nc";

function App() {
  const [dirHandle, setDirHandle] = useState();
  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState();

  async function pickDirectory() {
    const dirHandle = await window.showDirectoryPicker();
    let newFiles = {};
    setDirHandle(dirHandle);
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
      <h2>viewing {files.length} files</h2>
      <input type="button" value="pick directory" onClick={pickDirectory} />
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
