import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createNewRobot, createNewEmployee, createNewStation, createNewModel } from "./ressourceSlice";
import Header from "../Header";

const NewRessource = () => {

    const dispatch = useDispatch();
    const [type, setType] = useState();
    const [name, setName] = useState();
    const [time, setTime] = useState(10);
    const [complexity, setComplexity] = useState(1.0)

    const checkTypeAndSave = (t) => {
        var regexName = /^[a-zA-Z0-9 ]{3,}$/g;
        var regexTime = /^[0-9]{1,6}$/g;
        if (!name.match(regexName) || !name ) {
            alert("Name mus mindestens 3 Zeichen lang sein und darf keine Sonderzeichen enthalten.")
            return;
        }
        if (!time.toString().match(regexTime)) {
            alert("Ein Arbeitsschritt darf maximal 999999 Sekunden dauern und darf keine Buchstaben oder Sonderzeichen enthalten.")
            return;
        }
        if (isNaN(complexity) || complexity < 0.5 || complexity > 1.5 ) {
            alert("Die Komplexität muss ein Zahl im Bereich von 0.5 - 1.5 sein.")
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
            case "Fahrzeugmodell":
                dispatch(createNewModel({name : name, complexity: complexity}));
                break;
            default:
                break;
        }
    }

    const backBtn = <NavLink to="/"><button className="vw-btn m-1"><i class="bi bi-box-arrow-left"></i> zurück</button></NavLink>;

    return (
        <div className="container-fluid">

            <Header headline="Neue Ressource erstellen" btnArr={[backBtn]} />

            <form>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Typ:</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => { setType(e.target.value) }}>
                            <option defaultValue>Bitte wählen</option>
                            <option value="Roboter">Roboter</option>
                            <option value="Station">Station</option>
                            <option value="Mitarbeiter">Mitarbeiter</option>
                            <option value="Fahrzeugmodell">Fahrzeugmodell</option>
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
                    type != "Mitarbeiter" && type != "Fahrzeugmodell" ? <div className="row mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Benötigte Zeit:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="colFormLabel" placeholder={`${time} (in Sekunden)`} onChange={(e) => { setTime(e.target.value) }} />
                        </div>
                    </div> : <div></div>}

                    {
                    // eslint-disable-next-line
                    type == "Fahrzeugmodell" ? <div className="row mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Komplexität:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="colFormLabel" placeholder={`${complexity} ([0.5;1.5])`} onChange={(e) => { setComplexity(e.target.value) }} />
                        </div>
                    </div> : <div></div>}


                

            </form >
            <button className="vw-btn m-1" onClick={() => checkTypeAndSave(type)}>erstellen</button>

        </div >
    )
}

export default NewRessource;