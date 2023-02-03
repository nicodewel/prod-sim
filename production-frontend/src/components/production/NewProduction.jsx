import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProductionStep from "./ProductionStep";
import { useSelector, useDispatch } from "react-redux";
import { setCompBusy } from "./ressourceSlice";
import { buildNewProductionline } from "./productionlineSlice";
import Header from "../Header";

const NewProduction = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [carmodel, setCarmodel] = useState();
    const [order, setOrder] = useState([1]);
    const [componentList, setComponentList] = useState([]);

    const models = useSelector(state => state.ressources.carModels);
    const robotList = useSelector(state => state.ressources.robots).filter(comp => !comp.onDuty)
    const employeeList = useSelector(state => state.ressources.employees).filter(comp => !comp.onDuty)
    const stationList = useSelector(state => state.ressources.stations).filter(comp => !comp.onDuty)

    const buildProduction = () => {
        if (componentList.length < 3 ) {
            document.getElementById("staticBackdropLabel").innerHTML = "Nicht genügend Schritte."
            document.getElementById("modal-body").innerHTML = "Eine Produktionsstraße besteht aus mindestens 3 Schritten. "
            document.getElementById("modalBtn").setAttribute("data-bs-toggle", "modal")
            document.getElementById("modalBtn").click();
            document.getElementById("modalBtn").removeAttribute("data-bs-toggle", "modal")
        } else {
            // eslint-disable-next-line
            let cm = models.find(mod => carmodel == mod.id)
            let newLine = {
                "name": name,
                "carModel": {
                    "id": cm.id,
                    "name": cm.name,
                    "complexity": cm.complexity
                },
                "components": componentList,
                "active": false,
            }
            dispatch(buildNewProductionline(newLine));
            navigate("/");
        }
    }

    const nextStep = () => {
        // eslint-disable-next-line
        if (componentList[componentList.length - 1]?.id == undefined || componentList.length != order.length) {
            document.getElementById("staticBackdropLabel").innerHTML = "Schritt unvollständig"
            document.getElementById("modal-body").innerHTML = "Bitte eine Komponente auswählen."
            document.getElementById("modalBtn").setAttribute("data-bs-toggle", "modal")
            document.getElementById("modalBtn").click();
            document.getElementById("modalBtn").removeAttribute("data-bs-toggle", "modal")
        } else {
            setOrder([...order, order.length + 1])
            dispatch(setCompBusy(componentList[componentList.length - 1]));
            document.querySelectorAll(`.prodStep${order.length}`).forEach(element => element.setAttribute("disabled", true))
        }
    }

    const backBtn = <NavLink key={1} to="/"><button className="vw-btn m-1"><i className="bi bi-box-arrow-left"></i> zurück</button></NavLink>;

    return (
        <div className="container-fluid">
            <Header key={1} headline="Neue Produktionsstraße anlegen" btnArr={[backBtn]} />
            <form>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="colFormLabel" placeholder="Produktionsstraßenname" onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Modell</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example"  defaultValue={'Fahrzeugmodell wählen'} onChange={(e) => setCarmodel(e.target.value)} >
                            <option value="Fahrzeugmodell wählen">Fahrzeugmodell wählen</option>
                            {models?.map(mod => <option value={mod.id}>{mod.name}</option>)};
                        </select>
                    </div>
                </div>
                {order.map((o, i) => <ProductionStep key={i} order={o} componentList={componentList} setComponentList={setComponentList} robots={robotList} stations={stationList} employees={employeeList} />)}
            </form>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Schritt unvollständig</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="modal-body" className="modal-body">
                            Bitte eine Komponente auswählen.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Schließen</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="vw-btn m-1" id="modalBtn" data-bs-target="#staticBackdrop" onClick={() => nextStep()}>Schritt hinzufügen</button>
            <button className="vw-btn m-1" onClick={() => buildProduction()}>speichern</button>

        </div>
    )
}

export default NewProduction;