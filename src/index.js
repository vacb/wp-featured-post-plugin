import "./index.scss";

wp.blocks.registerBlockType("ourplugin/featured-academic", {
  title: "Academic Callout",
  description: "Include a short description and link to an academic",
  icon: "welcome-learn-more",
  category: "common",
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent() {
  return (
    <div className="featured-academic-wrapper">
      <div className="academic-select-container">
        We will have a select dropdown form element here.
      </div>
      <div>HTML preview of selected academic here.</div>
    </div>
  );
}
