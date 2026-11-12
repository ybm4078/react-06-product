// 이 파일은 글 상세 화면을 담당하는 컴포넌트 파일

import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import type { Product } from "./ProductList.tsx";

function ProductDetail() {
    const { id } = useParams(); // string | undefined

    // 아직 값이 도착하지 않은 상태의 "초기값"을 매개변수로 제공해줘야 함
    // Product 타입으로만 강제하면
    // 값이 "있다"로밖에는 표현을 할 수 없음
    const [post, setPost] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 지금 사용자가 /product/    만 일부러 치고 들어온 경우도 막는데
        // 실행이 아니라 App - ProductDetail 이 관계까지 생각해서 쓰는 게 아니라
        // ProductDetail만 보고 있는 것
        if (!id) return; // id값이 없으면 undefined가 찍혀서 id가 없으면 반환

        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then((json: Product) => setPost(json))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className={styles.loading}>본문을 불러오는 중입니다...</div>;
    }

    if (!post) {
        return <div className={styles.loading}>상품을 찾을 수 없습니다.</div>;
    }

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
