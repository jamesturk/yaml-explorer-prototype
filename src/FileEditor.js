function FileEditor(props) {
  if (!props.file) {
    return <div>No File Loaded</div>;
  }
  return (
    <div className="file-editor">
      <textarea value={props.file.raw} onChange={props.onChange} />
    </div>
  );
}

export default FileEditor;
