function FileList(props) {
  if (!props.files) {
    return <div>No files loaded.</div>;
  }
  const files = props.files.map((f) => (
    <li>
      <p className="filename" key={f.name}>{f.name}</p>
    </li>
  ));
  return (
    <div className="file-list">
      <ul>{files}</ul>
    </div>
  );
}

export default FileList;
