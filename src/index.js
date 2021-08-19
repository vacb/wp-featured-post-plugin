import "./index.scss";
import { useSelect } from "@wordpress/data";

wp.blocks.registerBlockType("ourplugin/featured-academic", {
  title: "Academic Callout",
  description: "Include a short description and link to an academic",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    academicId: { type: "string" },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  const allAcademics = useSelect((select) => {
    // In console: wp.data.select("core").getEntityRecords("postType", "academic", {per_page: -1})
    // Returns an array of all academic post type posts - can use instead of GET request to api endpoint
    // Import useSelect above
    return select("core").getEntityRecords("postType", "academic", {
      per_page: -1,
    });
  });

  console.log(allAcademics);
  if (allAcademics == undefined) return <p>Loading...</p>;

  return (
    <div className="featured-academic-wrapper">
      <div className="academic-select-container">
        <select
          onChange={(e) => props.setAttributes({ academicId: e.target.value })}
        >
          <option value="">Select an academic</option>
          {allAcademics.map((academic) => {
            return (
              <option
                value={academic.id}
                selected={props.attributes.academicId == academic.id}
              >
                {academic.title.rendered}
              </option>
            );
          })}
        </select>
      </div>
      <div>HTML preview of selected academic here.</div>
    </div>
  );
}
