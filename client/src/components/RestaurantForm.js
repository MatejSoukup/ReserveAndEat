function RestaurantForm(props){
const CategoryList = [{name:"a",id:"1"}, {name:"b",id:"1"}]

    return(
        <form>
        <div>
            <div>
                <input placeholder="Name"/>
                <input placeholder="Short description"/>
                <select placeholder="Category">
                    
                </select>
                <textarea placeholder="Description"/>
            </div>
            <div>
                <input placeholder="Opening hours"/>
                <input placeholder="Email"/>
                <input placeholder="Phone"/>
                <input placeholder="Address"/>
                <input placeholder="Website"/>    
            </div>
            <div>
                <button>Cancel</button>
                <input value="Create/Edit" type="submit"/>
            </div>
        </div>
        </form>
    )
}
export default RestaurantForm;
