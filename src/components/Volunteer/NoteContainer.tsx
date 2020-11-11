import React, {useRef, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {endpoint} from "../../config";
import {put} from "../../utils/fetch";


const NoteContainer = (props: {note: string | undefined, _id: string}) => {
    const [readonly, setReadonly] = useState(true);
    const [note, setNote] = useState(props.note);
    const [prevNote, setPrevNote] = useState(props.note);

    const sendNote = () => {
        const url = endpoint + "/admin/volunteers/note/" + props._id;
        const body = {note: note};

        console.log(body);

        put(url, body)
            .then(r => console.log(r))
            .catch(e => console.error(e));
    };

    return (
        <div style={{
            width: 635,
            height: 257,
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: 5,
            opacity: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <p style={{
                width: 50,
                height: 20,
                textAlign: "left",
                fontFamily: "Helvetica",
                fontSize: 21,
                fontWeight: "bold",
                letterSpacing: 0,
                color: "#2E2E2E",
                opacity: 1,
                alignSelf: "flex-start",
                marginLeft: 28
            }}>Notes</p>
            <TextField
                style={{
                    width: 579,
                    height: 117,
                    textAlign: "left",
                    fontFamily: "Helvetica",
                    fontSize: 16,
                    letterSpacing: 0,
                    color: "#898989",
                    opacity: 1
                }}
                variant="outlined"
                multiline={true}
                rows={5}
                onChange={(e) => setNote(e.target.value)}
                disabled={readonly}
                value={note}
            />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 25
                }}>
                {
                    readonly ? (<Button variant="contained" style={{width: 90}} color="primary"
                                        onClick={() => setReadonly(false)}>Edit</Button>)
                        : (
                            <>
                                <Button variant="contained" style={{width: 90}} color="default"
                                        onClick={() => {
                                            setReadonly(true);
                                            setNote(prevNote);
                                        }}>Cancel</Button>
                                <Button variant="contained" style={{width: 90}} color="primary" onClick={() => {
                                    setReadonly(true);
                                    sendNote();
                                    setPrevNote(note);
                                }}>Save</Button>
                            </>
                        )
                }
            </div>

        </div>
    )
}

export default NoteContainer;