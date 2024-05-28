$(document).ready(function() {
    
    function fetchStories() {
        $.ajax({
            url: 'https://usmanlive.com/wp-json/api/stories',
            method: 'GET',
            success: function(response) {
                $('#storyList').empty(); 
                response.forEach(function(story) {
                    $('#storyList').append(`<div class="story" data-id="${story.id}">
                        <h3>${story.title}</h3>
                        <p>${story.content}</p>
                        <button class="editBtn">Edit</button>
                        <button class="deleteBtn">Delete</button>
                    </div>`);
                });
            }
        });
    }

  
    fetchStories();

  
    $('#addStoryForm').submit(function(event) {
        event.preventDefault();
        var storyTitle = $('#storyInput').val();
        var storyContent = $('#storyContent').val();
        $.ajax({
            url: 'https://usmanlive.com/wp-json/api/stories',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                title: storyTitle,
                content: storyContent
            }),
            success: function(response) {
                fetchStories(); 
                $('#storyInput').val(''); 
                $('#storyContent').val('');
            }
        });
    });

    
    $('#storyList').on('click', '.deleteBtn', function() {
        var storyId = $(this).parent().data('id');
        $.ajax({
            url: "https://usmanlive.com/wp-json/api/stories/${storyId}",
            method: 'DELETE',
            success: function(response) {
                fetchStories(); 
            }
        });
    });

    $('#storyList').on('click', '.editBtn', function() {
        var storyDiv = $(this).parent();
        var storyId = storyDiv.data('id');
        var storyTitle = storyDiv.find('h3').text();
        var storyContent = storyDiv.find('p').text();
        
     
        var editForm = `
            <form class="editStoryForm">
                <input type="text" class="editTitleInput" value="${storyTitle}">
                <input type="text" class="editContentInput" value="${storyContent}">
                <button type="submit">Save</button>
            </form>
        `;
        
    
        storyDiv.html(editForm);
        
       
        $('.editStoryForm').submit(function(event) {
            event.preventDefault();
            var newTitle = $(this).find('.editTitleInput').val();
            var newContent = $(this).find('.editContentInput').val();
            
           
            $.ajax({
                url: "https://usmanlive.com/wp-json/api/stories/${storyId}",
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    title: newTitle,
                    content: newContent
                }),
                success: function(response) {
                    
                    fetchStories();
                }
            });
        });
    });
});