# Game for kids

The project is a simple game application written in Javascript which asks six questions.
It has a few animations to help direct the eyes to the instructions or state changes around
the application. There is on caveat. It may not work properly on iOS.

The game itself uses the **animate** api from Javascript. I removed the section of code 
that was giving the issue on iOS, but there are other sections that do use it. The application works
as far as I can tell on iOS, but may be buggy.

```javascript
function displayQuestion(index) {
    q.textContent = questions[index];
    
    /* experimental tech that does not work on iOS
    q.animate([
        {opacity: '0'},
        {opacity: '1'}
    ], 
    {
        duration: 1500
    }); */

    remaining.textContent = (index + 1) + "/" + questions.length;
}

```