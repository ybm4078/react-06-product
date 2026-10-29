import { useEffect, useState } from "react";
import { Link } from "react-router";

function ProductList() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then((res) => res.json())
            .then(json =>{
                setList(json.products);
                setLoading(false);
            })
        .catch(err => {console.log(err)
        setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>데이터를 로드 중입니다...</div>
    }

    return (
        <div>
            <h1>화장품 계시판</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>브랜드</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <Link to={`/${item.id}`} >{item.title}</Link>
                            <td>{item.brand}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductList;
