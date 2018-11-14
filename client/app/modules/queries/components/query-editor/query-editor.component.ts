import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'query-ace-editor',
    templateUrl: './query-editor.component.html'
})
export class QueryEditorComponent {
    @Input() schema: any;
    @Input() query: any;
    @Input() syntax: any;

    @ViewChild('editor') editor;

    editorOptions: any = {}

    constructor() {
        this.syntax = this.syntax || 'sql';
    }

    ngOnInit() {
        console.log(this.editor);
        this.editor.setTheme("eclipse");

        this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true
        });

        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {

            }
        });
    
    }

    addOptions() {
        // this.editorOptions = {
        //     mode: 'json',
        //     // require: ['ace/ext/language_tools'],
        //     advanced: {
        //         behavioursEnabled: true,
        //         enableSnippets: true,
        //         enableBasicAutocompletion: true,
        //         enableLiveAutocompletion: true,
        //         autoScrollEditorIntoView: true,
        //     },
        //     onLoad(editor) {
        //         $scope.$on('query-editor.command', ($event, command, ...args) => {
        //         switch (command) {
        //             case 'focus': {
        //                 editor.focus();
        //                 break;
        //             }
        //             case 'paste': {
        //                 const [text] = args;
        //                 editor.session.doc.replace(editor.selection.getRange(), text);
        //                 const range = editor.selection.getRange();
        //                 $scope.query.query = editor.session.getValue();
        //                 $timeout(() => {
        //                     editor.selection.setRange(range);
        //                 });
                        
        //                 break;
        //             }
        //             default:
        //                 break;
        //             }
        //         });

        //         // Release Cmd/Ctrl+L to the browser
        //         editor.commands.bindKey('Cmd+L', null);
        //         editor.commands.bindKey('Ctrl+P', null);
        //         editor.commands.bindKey('Ctrl+L', null);

        //         QuerySnippet.query((snippets) => {
        //             window.ace.acequire(['ace/snippets'], (snippetsModule) => {
        //                 const snippetManager = snippetsModule.snippetManager;
        //                 const m = {
        //                     snippetText: '',
        //                 };

        //                 m.snippets = snippetManager.parseSnippetFile(m.snippetText);
        //                 snippets.forEach((snippet) => {
        //                     m.snippets.push(snippet.getSnippet());
        //                 });

        //                 snippetManager.register(m.snippets || [], m.scope);
        //             });
        //         });

        //         editor.$blockScrolling = Infinity;
        //         editor.getSession().setUseWrapMode(true);
        //         editor.setShowPrintMargin(false);

        //         $scope.$watch('syntax', (syntax) => {
        //             const newMode = `ace/mode/${syntax}`;
        //             editor.getSession().setMode(newMode);
        //         });

        //         $scope.$watch('schema', (newSchema, oldSchema) => {
        //             if (newSchema !== oldSchema) {
                        
        //                 if (newSchema === undefined) {
        //                     return;
        //                 }
                        
        //                 const tokensCount = newSchema.reduce((totalLength, table) => totalLength + table.columns.length, 0);
        //                 // If there are too many tokens we disable live autocomplete,
        //                 // as it makes typing slower.
        //                 if (tokensCount > 5000) {
        //                     editor.setOption('enableLiveAutocompletion', false);
        //                 } else {
        //                     editor.setOption('enableLiveAutocompletion', true);
        //                 }
        //             }
        //         });

        //         $scope.$parent.$on('angular-resizable.resizing', () => {
        //             editor.resize();
        //         });

        //         editor.focus();
        //     }
        // };
    }

}