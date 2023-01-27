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

      if(componentMap.size < 3){
        console.log("LINIE MUSS MINDESTES 3 SCHRITTE BEINHALTEN")
      } else{
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
       //dispatch(buildNewProductionline(newLine));

      }

        


    }

    const nextStep = () => {
        
        if(mapEntry.comp.id == undefined){
            console.log("BITTE EINE KOMPONENTE AUSWÄHLEN")
            document.getElementById("modalBtn").setAttribute("data-bs-toggle", "modal")
            document.getElementById("modalBtn").click();
            document.getElementById("modalBtn").removeAttribute("data-bs-toggle", "modal")
        }else{
            setOrder([...order, order.length + 1])
            dispatch(setCompBusy(mapEntry.comp));
            document.querySelectorAll(`.prodStep${order.length}`).forEach(element =>  element.setAttribute("disabled", true))
        }      
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

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Schritt unvollständig</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bitte eine Komponente auswählen.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Schließen</button>
                        </div>
                    </div>
                </div>
            </div>

            <button id="modalBtn" data-bs-target="#staticBackdrop" onClick={() => nextStep()}>Schritt hinzufügen</button>
            <button onClick={() => buildProduction()}>speichern</button>
            {/* <button onClick={() => setOrder(order.slice(0, -1))}>Schritt entfernen</button> */}
            <NavLink to="/"><button>home</button></NavLink>

        </div>
    )
}

export default NewProduction;