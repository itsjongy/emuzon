import { Link } from 'react-router-dom';

function Categories({ categories }) {

    const category = new Set(categories)

    return (
        <div className="category">
            {[...category].slice(0, 6).map((each, idx) =>
                <Link className="category-link" key={idx} to={`/products/category/${each}`}>{each}</Link>
            )}
        </div>
    );
}

export default Categories;
