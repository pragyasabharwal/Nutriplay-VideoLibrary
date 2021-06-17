export const Notes = () => {
  return (
    <div className="row">
      <div className="notes">
        <span>Notes</span>
        <input
          value={input}
          placeholder={`Add a note...`}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <div className="buttons">
          <button className="button-outline-none" onClick={() => setInput("")}>
            CANCEL
          </button>
          <button
            className="button-primary margin-1"
            onClick={() => {
              setNotes((prev) => prev.concat(input));
              setInput("");
            }}
          >
            ADD
          </button>
        </div>
        <div className="item-list">
          {notes.map((item) => (
            <span>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
