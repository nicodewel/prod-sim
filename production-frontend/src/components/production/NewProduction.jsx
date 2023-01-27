import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProductionStep from "./ProductionStep";
import { useSelector, useDispatch } from "react-redux";
import { setCompBusy } from "./ressourceSlice";
import { buildNewProductionline } from "./productionlineSlice";

const NewProduction = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [carmodel, setCarmodel] = useState();
    const [order, setOrder] = useState([1]);
    const [componentMap, setComponentMap] = useState(new Map());
    const [mapEntry, setMapEntry] = useState({order:"", 
    comp: {
        employees:[]
    }});

    const robotList = useSelector(state => state.ressources.robots).filter(comp => !comp.onDuty)
    const employeeList = useSelector(state => state.ressources.employees).filter(comp => !comp.onDuty)
    const stationList = useSelector(state => state.ressources.stations).filter(comp => !comp.onDuty)

    const checkRunnable = () => {
        return false;
    }

    //active default false

    const addToMap = () => {
        componentMap.set(mapEntry.order,mapEntry.comp)
        console.log("MAP: ", componentMap);
    }

    const buildProduction = () => {
      addToMap();

        let newLine = {
            "name" : name,
            "carModel": {
                "name" : carmodel,
                "complexity": 0
            },
            "componentMap" : componentMap,
            "active" : false,
            "runnable" : checkRunnable()
        } 

        console.log("TOPOST:" , newLine)
       dispatch(buildNewProductionline(newLine));


    }

    const nextStep = () => {
        setOrder([...order, order.length + 1])
        dispatch(setCompBusy(mapEntry.comp));
        document.querySelectorAll(`.prodStep${order.length}`).forEach(element =>  element.setAttribute("disabled", true))
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

                {order.map((o, i) => <ProductionStep key={i} order={o}  addToMap={addToMap} mapEntry={mapEntry} setMapEntry={setMapEntry} robots={[...robotList]} stations={stationList} employees={employeeList}/>)}
            </form>

            <button onClick={() => nextStep()}>Schritt hinzufügen</button>
            <button onClick={() => buildProduction()}>speichern</button>
            <NavLink to="/"><button>zurück</button></NavLink>

        </div>
    )
}

export default NewProduction;