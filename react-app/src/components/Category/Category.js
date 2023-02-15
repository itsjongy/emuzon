import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import ProductCard from "../ProductCard";
import "./Category.css";

const Category = () => {
    const { category } = useParams();
    const product = useSelector(state => Object.values(state.product));

    return (
        <div className="category-container">
            <div className="category-boxes">
                {product.filter(each => each.category === category).map((each) => (
                    <ProductCard
                        key={each.id}
                        name={each.name}
                        price={each.price}
                        product_img={each.product_img}
                        rating={
                            each.average_rating_length
                                ? each.average_rating_total / each.average_rating_length
                                : 0
                        }
                        id={each.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Category;
