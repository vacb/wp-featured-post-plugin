import "./index.scss";
import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "react";
import apiFetch from "@wordpress/api-fetch";

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
  const [thePreview, setThePreview] = useState("");
  // USE EFFECT - CHANGE OF ACADEMIC IN DROPDOWN
  useEffect(() => {
    // Only run if an academic has been selected, i.e. blank if still on 'select an academic'
    if (props.attributes.academicId) {
      updateTheMeta();

      async function go() {
        const response = await apiFetch({
          // Assumes /wp-json at the start
          path: `/featuredAcademic/v1/getHTML?academicId=${props.attributes.academicId}`,
          method: "GET",
        });
        setThePreview(response);
      }
      go();
    }
  }, [props.attributes.academicId]);

  // USE EFFECT - BLOCK DELETED FROM EDIT SCREEN
  // Call updateTheMeta again to make sure db is updated
  useEffect(() => {
    // Return a cleanup function
    return () => {
      updateTheMeta();
    };
  }, []);

  // META DATA FOR FEATURED ACADEMICS
  // Also need to register new meta in PHP
  function updateTheMeta() {
    // Returns a list of all blocks in the editor, then filter for our custom block type, then map to get array of post ID numbers
    // Filter again to ensure meta only saved once per academic i.e. check for duplicate values
    const academicsForMeta = wp.data
      .select("core/block-editor")
      .getBlocks()
      .filter((x) => x.name == "ourplugin/featured-academic")
      .map((x) => x.attributes.academicId)
      .filter((x, index, arr) => {
        return arr.indexOf(x) == index;
      });
    console.log(academicsForMeta);
    wp.data
      .dispatch("core/editor")
      .editPost({ meta: { featuredAcademic: academicsForMeta } });
  }

  const allAcademics = useSelect((select) => {
    // In console: wp.data.select("core").getEntityRecords("postType", "academic", {per_page: -1})
    // Returns an array of all academic post type posts - can use instead of GET request to api endpoint
    // Import useSelect above
    return select("core").getEntityRecords("postType", "academic", {
      per_page: -1,
    });
  });

  // console.log(allAcademics);
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
      <div dangerouslySetInnerHTML={{ __html: thePreview }}></div>
    </div>
  );
}
