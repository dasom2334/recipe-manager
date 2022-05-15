import { useSelector, useDispatch } from "react-redux";
import { EyeSVG, PencilSVG, TrashSVG } from "@/icons";
import { useEffect } from "react";

export function List(list) {
  console.log(list.list);
  console.log(typeof list);
  console.log(typeof list.list);
	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>이름</th>
					<th>시간</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{(list.list)?list.list.map(({ _id, recipe_name,  cooking_time }) => (
					<tr key={_id}>
						<td>{recipe_name}</td>
						<td>{cooking_time}</td>
						<td>
							 <a
								className="btn btn__compact btn__edit"
								href={"/recipe/" + _id}
							>
                <EyeSVG />
              </a>
							 <a
								className="btn btn__compact btn__edit"
								href={"/recipe/new/" + _id}
							>
								<PencilSVG />
							</a>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									// dispatch(deleteEmployee(_id));
								}}
							>
								<TrashSVG />
							</button> 
						</td>
					</tr>
				)):null} 
			</tbody>
		</table>
	);
}
