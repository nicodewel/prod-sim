import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { simulateProductionline } from "./productionlineSlice";
import { stopSimulation } from "./productionlineSlice";


const ProductionLine = ({ pl, number }) => {

    const dispatch = useDispatch();
    const [carModel, setCarModel] = useState(pl.carModel.id);
    const [simSpeed, setSimSpeed] = useState(pl.simTime)


    const models = useSelector(state => state.ressources.carModels)

    useEffect(() => {
        isNaN(simSpeed) ? console.log("NOT A NUMBER") : console.log("A Number")
    })

    const startSimulation = () => {
        let newMod = models.find(mod => mod.id == carModel)
        let data = { ...pl, carModel: newMod, simSpeed: simSpeed }

        if (!isNaN(simSpeed)) {
            dispatch(simulateProductionline(data));

        } else {
            alert("Bitte eine Ganzahl eintragen")
        }

    }

    return (
        <tr>
            <th scope="row">{number + 1}</th>
            <td>{pl.name == null ? "Linienname" : pl.name}</td>
            <td>
                <select className="form-select" onChange={e => setCarModel(e.target.value)} disabled={pl.active}>
                    {models.map((mod, i) => <option key={i} value={mod.id} selected={pl.carModel.name == mod.name ? "selected" : ""}>{mod.name}</option>)}
                </select>
                {/* {pl.name == null ? "Fahrzeug" : pl.carModel.name} */}
            </td>
            <td>{pl.runnable ? "lauffähig" : "unvollständig"}</td>
            <td>{pl.active ? "läuft" : "läuft nicht"} </td>
            <td>{pl.finishedParts}</td>
            <td><input className="col-4" placeholder={pl.simSpeed} onChange={(e) => setSimSpeed(e.target.value)} /></td>
            <td> <i className="bi bi-play iconhover" onClick={() => startSimulation()}></i><i className="bi bi-stop iconhover" onClick={() => dispatch(stopSimulation(pl))} ></i><i className="bi bi-info-square iconhover"></i></td>
        </tr>
    )

}

export default ProductionLine