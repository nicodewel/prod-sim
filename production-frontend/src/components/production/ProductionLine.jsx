import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { simulateProductionline, stopSimulation, deleteLine } from "./productionlineSlice";


const ProductionLine = ({ pl, number }) => {
    const dispatch = useDispatch();
    const [carModel, setCarModel] = useState(pl.carModel.id);
    const [simSpeed, setSimSpeed] = useState(pl.simSpeed)

    const models = useSelector(state => state.ressources.carModels)
    // eslint-disable-next-line
    const thisSim = useSelector(state => state.productionlines.simulatedLines).find(sim => sim.id == pl.id)

    const startSimulation = () => {
        // eslint-disable-next-line
        let newMod = models.find(mod => mod.id == carModel)
        let data = { ...pl, carModel: newMod, simSpeed: simSpeed }
        var regexSpeed = /^[0-9]{1,4}$/g;

        if (!isNaN(simSpeed) && simSpeed.toString().match(regexSpeed)) {
            dispatch(simulateProductionline(data));
        } else {
            alert("Bitte eine Ganzahl zwischen 1-9999 eintragen")
        }
    }

    return (
        <tr className="align-middle">
            <th scope="row">{number + 1}</th>
            {/* eslint-disable-next-line */}
            <td>{pl.name == null ? "Linienname" : pl.name}</td>
            <td>
                <select className="form-select" onChange={e => setCarModel(e.target.value)} disabled={pl.active}>
                    {/* eslint-disable-next-line */}
                    {models.map((mod, i) => <option key={i} value={mod.id} selected={pl.carModel.name == mod.name ? "selected" : ""}>{mod.name}</option>)}
                </select>
            </td>
            <td>{pl.runnable ? "lauffähig" : "unvollständig"}</td>
            <td>{thisSim?.active ? "läuft" : "läuft nicht"} </td>
            <td>{thisSim ? thisSim.finishedParts : pl.finishedParts}</td>
            <td><input className="col-4" placeholder={pl.simSpeed} onChange={(e) => setSimSpeed(e.target.value)} /></td>
            <td style={{ "font-size": "1.5em" }}> <i className="bi bi-play iconhover ms-2" onClick={() => startSimulation()}></i></td>
            <td className="text-center" style={{ "font-size": "1.5em" }}> <i className="bi bi-stop iconhover" onClick={() => dispatch(stopSimulation(pl))} ></i></td>
            <td className="text-center" style={{ "font-size": "1.5em" }}> <i className="bi bi-trash3" onClick={() => dispatch(deleteLine(pl.id))} ></i></td>

        </tr>

    )
}

export default ProductionLine;