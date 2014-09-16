            var source = {
                localdata: library,
                datatype: "json", 
                datafields: [{
                      name: 'name'
                    },
                    {
                      name: 'uns'
                    },
                    {
                      name: 'comments'
                    },
                    {
                       name: 'enabled',
                       type:'boolean'
                    },
                    {
                       name: 'tramp',
                       type:'boolean'
                    }

                ],
                pagesize: 20,
                addrow: function(rowid, rowdata, position, commit) {
                    // synchronize with the server - send insert command
                    // call commit with parameter true if the synchronization with the server is successful 
                    //and with parameter false if the synchronization failed.
                    // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
                    commit(true);

                }

            };
            var editrow = -1;
            var dataAdapter = new $.jqx.dataAdapter(source, {
                async: false,
                loadError: function(xhr, status, error) {
                    alert('Error loading "' + source.url + '" : ' + error);
                }
            });


            $("#jqxgradelibsgrid").jqxGrid({
                width: '100%',
                autorowheight: true,
                autoheight: true,
                editable: false,
                pageable: true,
                showtoolbar: true,
                theme: 'Arctic',
                selectionmode: 'singlerow',
                source: dataAdapter,
                rendertoolbar: function(toolbar) {
                    var me = this;
                    var container = $("<div style='margin: 5px;'></div>");
                    toolbar.append(container);
                    var addButton = '<button id="addgrade" class="btn btn-primary btn-sm"><span>Add Grade</span></button>';
                    var deleteButton = '<button id="deletegrade" class="btn btn-danger btn-sm" style="margin-left: 10px;"><span>Delete</span>  </button>';
                    container.append(addButton);
                    // container.append('<div width="10px"></div>');
                    container.append(deleteButton);
                    $("#addgrade").jqxButton();
                    $("#deletegrade").jqxButton();
                    // create new row.


                },
                columns: [{
                    text: 'Name',
                    datafield: 'name',
                },{
                    text: 'Uns',
                    datafield: 'uns',
                },{
                    text: 'Comments',
                    datafield: 'comments',
                },{
                    text: 'Enabled',
                    datafield: 'enabled',
                    columntype: 'checkbox'
                },{
                    text: 'Tramp',
                    datafield: 'tramp',
                    columntype: 'checkbox'
                }]
            });