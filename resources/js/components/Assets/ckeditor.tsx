// @ts-nocheck

import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  RemoveFormat,
  Strikethrough,
  SimpleUploadAdapter,
  TextTransformation,
  Underline,
  Context,
  ContextWatchdog,
  SourceEditing,
  Undo
} from 'ckeditor5';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';

const LicenseKey = 'GPL';
interface CKEditorProps {
  value?: string;
  onChange: (value: string) => void;
  toolbar?: string[];
  height?: string;
}

export default function CustomCKEditor({ value, onChange, toolbar, height }: CKEditorProps) {
  return (
    <div className="prose w-full">

      <CKEditorContext context={Context} contextWatchdog={ContextWatchdog}>
        <CKEditor
          editor={ClassicEditor}

          config={{
            licenseKey: LicenseKey,

            simpleUpload: {
              uploadUrl: '/api/ckeditor/image',
              headers: {
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''
              }
            },
            toolbar: [
              'heading',
              '|',
              'undo',
              'redo',
              '|',
              // 'fontSize',
              // 'fontFamily',
              // 'fontColor',
              // 'fontBackgroundColor',
              // '|',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'removeFormat',
              '|',
              'link',
              'alignment',
              'bulletedList',
              'numberedList',
              'imageUpload',
              '|',
              'sourceEditing',
              '|',
              'outdent',
              'indent',
            ],
            plugins: [
              Alignment,
              Autoformat,
              AutoImage,
              Autosave,
              BlockQuote,
              Bold,
              Essentials,
              FontBackgroundColor,
              FontColor,
              FontFamily,
              FontSize,
              Heading,
              Highlight,
              HorizontalLine,
              ImageBlock,
              ImageCaption,
              ImageInline,
              ImageInsertViaUrl,
              ImageResize,
              ImageStyle,
              ImageTextAlternative,
              ImageToolbar,
              ImageUpload,
              Indent,
              IndentBlock,
              Italic,
              Link,
              LinkImage,
              List,
              ListProperties,
              Paragraph,
              RemoveFormat,
              Strikethrough,
              SourceEditing,
              SimpleUploadAdapter,
              TextTransformation,
              Underline,
              Undo
            ],
            heading: {
              options: [
                {
                  model: 'paragraph',
                  title: 'Paragraph',
                  class: 'ck-heading_paragraph'
                },
                {
                  model: 'heading1',
                  view: 'h1',
                  title: 'Heading 1',
                  class: 'ck-heading_heading1'
                },
                {
                  model: 'heading2',
                  view: 'h2',
                  title: 'Heading 2',
                  class: 'ck-heading_heading2'
                },
                {
                  model: 'heading3',
                  view: 'h3',
                  title: 'Heading 3',
                  class: 'ck-heading_heading3'
                },
                {
                  model: 'heading4',
                  view: 'h4',
                  title: 'Heading 4',
                  class: 'ck-heading_heading4'
                },
                {
                  model: 'heading5',
                  view: 'h5',
                  title: 'Heading 5',
                  class: 'ck-heading_heading5'
                },
                {
                  model: 'heading6',
                  view: 'h6',
                  title: 'Heading 6',
                  class: 'ck-heading_heading6'
                }
              ]
            },
            image: {
              toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage'
              ]
            },
            link: {
              addTargetToExternalLinks: true,
              defaultProtocol: 'https://',
              decorators: {
                toggleDownloadable: {
                  mode: 'manual',
                  label: 'Downloadable',
                  attributes: {
                    download: 'file'
                  }
                }
              }
            },
            list: {
              properties: {
                styles: true,
                startIndex: true,
                reversed: true
              }
            },
            placeholder: 'Type or paste your content here!',
            table: {
              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
            }
          }}
          data={value}
          onReady={(editor: any) => {

            if (height) {
              const root = editor.editing.view.document.getRoot();
              if (root) {
                editor.editing.view.change((writer: any) => {
                  writer.setStyle('min-height', height, root);
                });
              }
            }
          }}


          onChange={(_event, editor) => { onChange(editor.getData()); }}
        />
      </CKEditorContext>
    </div>
  );
}
