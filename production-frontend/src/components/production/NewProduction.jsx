import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProductionStep from "./ProductionStep";

const NewProduction = () => {


    const [name, setName] = useState();
    const [carmodel, setCarmodel] = useState();
    const [order, setOrder] = useState([1]);
    const [componentMap, setComponentMap] = useState(new Map());

    const [mapEntry, setMapEntry] = useState({order:"", 
    comp: {
        employees:[]
    }});

    const checkRunnable = () => {
        return true;
    }

    //active default false

    const addToMap = () => {
        console.log("AddToMap: " + mapEntry);
       
        componentMap.set(mapEntry.order,mapEntry.comp)
        console.log("MAP: ", componentMap);
    }

    const buildProduction = () => {
      addToMap();

        let newLine = {
            "name" : name,
            "carModel": carmodel,
            "componentMap" : componentMap,
            "active" : false,
            "runnable" : checkRunnable()
        } 
        console.log("MAP: ", componentMap)
        console.log(newLine)

    }
    return (

        <div>
            <h1>Neue Produktionsstraße anlegen</h1>


            <form>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-4">
                        <input type="email" className="form-control" id="colFormLabel" placeholder="Produktionsstraßenname" onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Modell</label>
                    <div className="col-sm-4">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setCarmodel(e.target.value)} >
                            <option defaultValue>Fahrzeugmodell wählen</option>
                            <option value="Golf">Golf</option>
                            <option value="Tiguan">Tiguan</option>
                        </select>
                    </div>
                </div>

                {order.map((o, i) => <ProductionStep key={i} order={o}  addToMap={addToMap} mapEntry={mapEntry} setMapEntry={setMapEntry} />)}


            </form>


            <button onClick={() => setOrder([...order, order.length + 1])}>Schritt hinzufügen</button>
            <button onClick={() => buildProduction()}>speichern</button>
            <NavLink to="/"><button>zurück</button></NavLink>

        </div>





    )

}

export default NewProduction;