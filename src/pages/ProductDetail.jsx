// 이 파일은 글 상세 화면을 담당하는 컴포넌트 파일

import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";

function ProductDetail() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(json => setPost(json))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
            // .finally(함수) 매서드는 메서드 체인을 통해
            // then을 통해 성공 시나리오든, catch를 통한 실패 시나리오든
            // 상관 없이 마지막에 실행되어야 하는 내용을 기록
    }, []);

    // 초기 렌더링에는 loading이 true이므로, 이 아래 if가 출력
    if (loading) {
        return <div className={styles.loading}>본문을 불러오는 중입니다...</div>;
    }
    // useEffect가 발동해서 fetch가 실행되는데
    // 정상적으로 데이터를 받아오든, 받아오지 못하든 loading은 false가 됨
    // 이 아래로 내려오는데 실패되면 product state는 갱신되지 못 하고 null로 남아있음

    if (!post) {
        return <div className={styles.loading}>상품을 찾을 수 없습니다.</div>;
    }

    //loading도 false이고, post도 있는 상황
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <Link to={"/"} className={styles.backLink}>
                    &larr; 목록으로
                </Link>
                <div className={styles.body}>
                    <img alt={post.title} src={post.thumbnail} className={styles.thumbnail} />
                    <div className={styles.card}>
                        <h2 className={styles.title}>{post.title}</h2>
                        <div> 브랜드 : {post.brand}</div>
                        <span>$ {post.price}</span>
                        <div> 할인률 : {post.discountPercentage}%</div>
                        <div> 평점 : {post.rating}/5 점</div>
                        <div> 재고 : {post.stock}개</div>
                        <div> 무게 : {post.weight}g</div>
                        <div> 설명 : {post.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
