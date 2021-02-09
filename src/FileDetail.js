function list_to_html(list) {
  if (list.length === 0) {
    return "[]";
  }
  return list.map(object_to_html);
}

function object_to_html(obj) {
  let elements = [];
  if(!obj) {
    return "";
  }
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === "string") {
      elements.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{val}</td>
        </tr>
      );
    } else if (Array.isArray(val)) {
      elements.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{list_to_html(val)}</td>
        </tr>
      );
    } else if (typeof val === "object") {
      elements.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{object_to_html(val)}</td>
        </tr>
      );
    }
  }
  return elements;
}

function FileDetail(props) {
  if (!props.file) {
    return <div>No File Loaded</div>;
  }
  return (
    <div className="file-detail">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{object_to_html(props.file.data)}</tbody>
      </table>
    </div>
  );
}

export default FileDetail;
