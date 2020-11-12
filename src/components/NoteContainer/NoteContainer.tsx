import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { endpoint } from '../../config';
import { put } from '../../utils/fetch';

import './NoteContainer.scss';

const NoteContainer = (props: { note: string | undefined; _id: string }) => {
  const [readonly, setReadonly] = useState(true);
  const [note, setNote] = useState(props.note);
  const [prevNote, setPrevNote] = useState(props.note);

  const sendNote = () => {
    const url = endpoint + '/admin/volunteers/note/' + props._id;
    const body = { note: note };

    console.log(body);

    put(url, body)
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  };

  return (
    <div className="note__container">
      <h6 className="note__header">Notes</h6>

      {readonly ? (
        <p className="note__textValue">{note}</p>
      ) : (
        <TextField
          style={{
            width: '90%',
            height: '55%',
            fontSize: 16,
            boxSizing: 'border-box',
          }}
          variant={'outlined'}
          multiline={true}
          rows={5}
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
      )}
      <div className="note__buttonGroup" style={{}}>
        {readonly ? (
          <Button
            variant="contained"
            style={{ width: 90, borderRadius: 25 }}
            color="primary"
            onClick={() => setReadonly(false)}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              style={{ width: 90, borderRadius: 25 }}
              color="default"
              onClick={() => {
                setReadonly(true);
                setNote(prevNote);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ width: 90, borderRadius: 25 }}
              color="primary"
              onClick={() => {
                setReadonly(true);
                sendNote();
                setPrevNote(note);
              }}
            >
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteContainer;
