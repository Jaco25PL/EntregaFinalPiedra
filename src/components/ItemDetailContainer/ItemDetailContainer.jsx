import styles from "./styles.module.css"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/client"
import { Loader } from "../Loader/Loader"

export const ItemDetailContainer = () => {

    const [detail, setDetail] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {

        const docRef = doc(db, "products", id)
        getDoc(docRef)
            .then(res => {
                setDetail(
                    {...res.data(), id: res.id}
                )
            })
            .finally(() => setLoading(false))

    }, [id])

    return (
        <div className={styles.container}>
            {loading ? <Loader/> : <ItemDetail detail={detail} />}
        </div>
    )
}