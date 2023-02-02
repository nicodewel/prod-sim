import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createNewRobot, createNewEmployee, createNewStation } from "./ressourceSlice";

const NewRessource = () => {

    const dispatch = useDispatch();
    const [type, setType] = useState();
    const [name, setName] = useState();
    const [time, setTime] = useState(10);

    const checkTypeAndSave = (t) => {
        var regexName = /^[a-zA-Z0-9]{3,}$/g;
        var regexTime = /^[0-9]{1,6}$/g;
        if (!name.match(regexName)) {
            alert("Name mus mindestens 3 Zeichen lang sein und darf keine Sonderzeichen enthalten.")
            return;
        }
        console.log("TIME: ", time.toString())
        if (!time.toString().match(regexTime)) {
            alert("Ein Arbeitsschritt darf maximal 999999 Sekunden dauern und darf keine Buchstaben oder Sonderzeichen enthalten.")
            return;
        }
        switch (t) {
            case "Roboter":
                dispatch(createNewRobot({ productionTime: time, step: 0, liftime: 1000, name: name, type: "robot" }));
                break;
            case "Station":
                dispatch(createNewStation({ productionTime: time, step: 0, name: name, employees: [], type: "station" }));
                break;
            case "Mitarbeiter":
                dispatch(createNewEmployee({ name: name }));
                break;
            default:
                break;
        }
    }

    return (
        <div className="container-fluid">
            <h1>Neue Ressource erstellen</h1>
            <form>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Typ:</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => { setType(e.target.value) }}>
                            <option defaultValue>Bitte wählen</option>
                            <option value="Roboter">Roboter</option>
                            <option value="Station">Station</option>
                            <option value="Mitarbeiter">Mitarbeiter</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Name:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="colFormLabel" placeholder="Ressourcenname" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                </div>

                {
                    // eslint-disable-next-line
                    type != "Mitarbeiter" ? <div className="row mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Benötigte Zeit:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="colFormLabel" placeholder={`${time} (in Sekunden)`} onChange={(e) => { setTime(e.target.value) }} />
                        </div>
                    </div> : <div></div>}

            </form >
            <button className="btn btn-primary m-1" onClick={() => checkTypeAndSave(type)}>erstellen</button>
            <NavLink to="/"><button className="btn btn-primary m-1">zurück</button></NavLink>
        </div >
    )
}

export default NewRessource;