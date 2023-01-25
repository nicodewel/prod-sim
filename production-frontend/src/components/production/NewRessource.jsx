import { useState } from "react";
import { NavLink } from "react-router-dom";

const NewRessource = () => {


    const [type, setType] = useState();
    const [name, setName] = useState();
    const [time, setTime] = useState();

    return (


        <div>

            <h1>Neue Ressource erstellen</h1>
            <form>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Typ:</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => { setType(e.target.value) }}>
                            <option defaultValue>Bitte wählen</option>
                            <option value="Roboter">Robotor</option>
                            <option value="Station">Station</option>
                            <option value="Mitarbeiter">Mitarbeiter</option>
                        </select>
                    </div>

                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Name:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="colFormLabel" placeholder="Stationsname" onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                </div>

                {type != "Mitarbeiter" ? <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Benötigte Zeit:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="colFormLabel" placeholder="in Sekunden" onChange={(e) => {setTime(e.target.value)}}/>
                    </div>
                </div> : <div></div>}




            </form >
            <NavLink to="/"><button>zurück</button></NavLink>

        </div >




    )


}

export default NewRessource;