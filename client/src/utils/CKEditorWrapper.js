import React, { useEffect, useRef } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb';
import '../ckeditor';

const CKEditorWrapper = ({ value, onChange }) => {
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.editing.view.change((writer) => {
        writer.setStyle('height', '300px', editorRef.current.editor.editing.view.document.getRoot());
      });
    }
  }, []);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(data);
  };

  return (
    <CKEditor
      editor={window.ClassicEditor}
      data={value}
      onChange={handleEditorChange}
      config={{
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
      }}
      onReady={(editor) => {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return new MyUploadAdapter(loader);
        };
      }}
      ref={editorRef}
    />
  );
};

export default CKEditorWrapper;
