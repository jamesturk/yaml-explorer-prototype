function currentParty(person) {
  try {
    for (const party of person.party) {
      if (party.end_date === undefined) {
        return party.name;
      }
    }
  } catch (err) {
    return "";
  }
}

function currentRole(person) {
  try {
    for (const role of person.roles) {
      if (role.end_date === undefined) {
        return role;
      }
    }
  } catch (err) {
    return "";
  }
}

function ListRow(props) {
  if (!props.person) {
    return "loading...";
  } else {
    const role = currentRole(props.person);
    return (
      <tr
        className={props.selected ? "selected" : ""}
        key={props.key}
        onClick={props.onClick}
      >
        <td>{props.person.name}</td>
        <td>{currentParty(props.person)}</td>
        <td>{role.district}</td>
        <td>{role.type}</td>
      </tr>
    );
  }
}

function FileList(props) {
  if (!props.files) {
    return <div>No files loaded.</div>;
  }
  const files = Object.entries(props.files).map(([filename, p]) => (
    <ListRow
      person={p.data}
      key={filename}
      onClick={() => props.setSelectedFile(filename)}
      selected={filename === props.selectedFile}
    />
  ));
  return (
    <div className="file-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>District</th>
            <th>Chamber</th>
          </tr>
        </thead>
        <tbody>{files}</tbody>
      </table>
    </div>
  );
}

export default FileList;
