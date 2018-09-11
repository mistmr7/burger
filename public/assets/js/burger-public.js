$(function () {
    $('#submit').on('click', function(e){
        e.preventDefault()
        let newBurger = {
            burger_name: $('#burger-name').val().trim()
        }
        console.log(newBurger)
        $.ajax('/api/burgers/',
        {
            type: 'POST',
            data: newBurger
        }).then(() => {
            console.log('created new burger')
            location.reload()
        })
    })

    $('.devour-burger').on('click', function(e){
        let id = $(this).data('id')
        let devoured = $(this).data('devoured')
        console.log(devoured)

        let status = {
            devoured: 1
        }

        console.log(status)

        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: status
        }).then(function(){
            console.log('Changed burger status to', devoured)
            location.reload()
        })

    })
})