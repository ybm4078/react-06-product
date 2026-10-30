import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { Link } from "react-router";

function ProductList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => res.json()) // string -> 객체/배열 상태로 가공
            .then(json => {
                setList(json.products);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div className={styles.loading}>데이터를 로드 중입니다...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>화장품 게시판</h1>
            <table className={styles.boardTable}>
                <thead>
                    <tr>
                        <th className={styles.idCell}>번호</th>
                        <th>제목</th>
                        <th>브랜드</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={styles.idCell}>{item.id}</td>
                            <td className={styles.titleCell}>
                                <Link to={`/product/${item.id}`} className={styles.link}>
                                    {item.title}
                                </Link>
                            </td>
                            <td className={styles.userIdCell}>{item.brand}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
