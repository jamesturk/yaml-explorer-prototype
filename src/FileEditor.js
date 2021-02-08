
function FileEditor(props) {
  if(!props.file) {
    return <div>No File Loaded</div>;
  }
  return (
    <div className="file-editor">
    <textarea>
    {props.file.raw}
    </textarea>
    </div>
  );
}

export default FileEditor;
