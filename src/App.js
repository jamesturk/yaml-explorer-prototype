import {useState} from 'react';
import YAML from 'yaml';
import FileList from './FileList';
import FileDetail from './FileDetail';
import FileEditor from './FileEditor';

const dataDir = "/Users/james/code/os/people/data/nc";


function App() {
  const [dirHandle, setDirHandle] = useState();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  async function pickDirectory() {
    const dirHandle = await window.showDirectoryPicker();
    let newFiles = [];
    setDirHandle(dirHandle);
    for await (let [name, handle] of dirHandle) {
      let obj = {name: name};
      let file = await handle.getFile();
      let fr = new FileReader();
      fr.onload = function (e) {
        obj.raw = fr.result;
        obj.data = YAML.parse(fr.result);
      }
      await fr.readAsText(file);
      newFiles.push(obj);
    } 
    setFiles(newFiles);
    setSelectedFile(0);
  }

  return (
    <div className="App">
      <h1>Person YAML Browser</h1>
      <h2>viewing {files.length} files</h2>
      <input type="button" value="pick directory" onClick={pickDirectory} />
      <div className="three-column">
        <FileList files={files} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <FileDetail file={files[selectedFile]} />
        <FileEditor file={files[selectedFile]} />
      </div>
    </div>
  );
}

export default App;
