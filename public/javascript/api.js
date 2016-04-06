$(function() {

  $('#viewAll').click(function(){
    $('.createContact').hide();
    $('#contact-table').empty();
    $.ajax({
      method: "GET",
      url: "/api/v1/viewall",
      }).done(
        function(contacts){
          var myTable       = $("#contact-table");
          trElement     = "<tr>";
          trElement    += "<td>First Name</td>";
          trElement    += "<td> Last Name </td>";
          trElement    += "<td> email </td>";
          trElement    += "<td> Phone </td>";
          trElement    += "<td> Options </td>";
          trElement        += "</tr>";
          myTable;
          myTable.append(trElement);
          $.each(contacts, populateContactInfoInTheTable);
        }
      );

    $('.allContacts').show();
  });

  $('#create').click(function(){
    $('.allContacts').hide();
    $('.createContact').show();
  });

  $('.btnCreate').click(function(){
    $.ajax({
      method: "POST",
      url: "/api/v1/create",
      data: { 
        firstname: $('#firstname').val(),
        lastname: $('#lastname').val(),
        email: $('#email').val(),
        phone: $('#phone').val()
      } 
    });
  });

  // @name populateContactInfoInTheTable
  // @desc Insert the contact information on the DOM.
  function populateContactInfoInTheTable(i, contact){
    var myTable       = $("#contact-table");
        trElement     = "<tr>";
        trElement    += "<td>" + contact.first_name + "</td>";
        trElement    += "<td>" + contact.last_name + "</td>";
        trElement    += "<td>" + contact.email + "</td>";
        trElement    += "<td>" + contact.phone + "</td>";
        trElement    += '<td><button id="edit' + contact.id + '" class="btn btn-warning">Edit</button> <button id="destory' + contact.id + '" class="btn btn-danger">Delete</button></td>';
        trElement        += "</tr>";
        //create a button

    myTable.append(trElement);

    $('#edit' + contact.id).click(function() {
        edit(contact.id);
    });

    $('#destory' + contact.id).click(function() {
        destory(contact.id);
    });
  }

  function edit(id){
    console.log('EDITING', id);
    $('.createContact').show();
    $('.btnCreate').innerHtml.textContent("Update");

  }

  function destory(id){
    console.log('deleting', id);
    $.ajax({
      method: "POST",
      url: "/api/v1/destory",
      data: {id: id}
    }).done
  }

});