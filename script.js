document.addEventListener('DOMContentLoaded', () => {

    const gameData = [
        {
            category: "Java Fundamentals",
            questions: [
                { points: 100, answer: "The machine that runs Java bytecode, enabling the 'Write Once, Run Anywhere' principle.", question: "What is the JVM (Java Virtual Machine)?" },
                { points: 200, answer: "This type of error, like a missing semicolon, is caught by the compiler before the program can run.", question: "What is a compile-time error?" },
                { points: 300, answer: "The four components of the `main` method signature are `public`, `static`, `void`, and this parameter.", question: "What is `String[] args`?" },
                { points: 400, answer: "This keyword marks a variable as a constant whose value cannot be changed after initialization.", question: "What is `final`?" },
                { points: 500, answer: "A program that runs without errors but produces an incorrect result has this type of error.", question: "What is a logical error?" }
            ]
        },
        {
            category: "Data & Input",
            questions: [
                { points: 100, answer: "Java's 8 of these include `int`, `double`, `char`, and `boolean`.", question: "What are primitive data types?" },
                { points: 200, answer: "This class must be imported from `java.util` to get input from the user.", question: "What is the `Scanner` class?" },
                { points: 300, answer: "While a `char` is in single quotes, this object type for text is in double quotes.", question: "What is a `String`?" },
                { points: 400, answer: "The naming convention for variables like `studentName` or `courseCode`.", question: "What is camelCase?" },
                { points: 500, answer: "The object representation for the primitive `int`.", question: "What is the `Integer` wrapper class?" }
            ]
        },
        {
            category: "Operators & Casting",
            questions: [
                { points: 100, answer: "This arithmetic operator gives you the remainder of a division.", question: "What is the modulo operator (`%`)?" },
                { points: 200, answer: "The result of the integer division expression `9 / 2`.", question: "What is 4?" },
                { points: 300, answer: "This is the shorthand operator for `x = x + 1;`.", question: "What is `x++` (or `++x`)?" },
                { points: 400, answer: "The term for explicitly converting a value, such as `(int) 3.14`.", question: "What is type casting?" },
                { points: 500, answer: "The final string output from the expression `\"Result: \" + 5 + 3`.", question: "What is `\"Result: 53\"`?" }
            ]
        },
        {
            category: "String Mania",
            questions: [
                { points: 100, answer: "This method returns the number of characters in a String.", question: "What is `.length()`?" },
                { points: 200, answer: "The principle that once a String is created, it cannot be changed.", question: "What is immutability?" },
                { points: 300, answer: "The correct method to compare the contents of two Strings, not `==`.", question: "What is `.equals()`?" },
                { points: 400, answer: "Given `String s = \"Java\";`, this method call returns the character `'v'`.", question: "What is `s.charAt(2)`?" },
                { points: 500, answer: "Given `String url = \"www.pace.edu\";`, this call extracts the substring `\"pace\"`.", question: "What is `url.substring(4, 8)`?" }
            ]
        },
        {
            category: "Control Flow & Arrays",
            questions: [
                { points: 100, answer: "This statement executes a block of code only if a condition is true.", question: "What is an `if` statement?" },
                { points: 200, answer: "This logical operator (`||`) returns true if at least one of its conditions is true.", question: "What is the OR operator?" },
                { points: 300, answer: "The index of the very first element in an array.", question: "What is 0?" },
                { points: 400, answer: "This type of loop is ideal when you know exactly how many times you want to repeat code.", question: "What is a `for` loop?" },
                { points: 500, answer: "The keyword used to exit a `switch` case or terminate a loop prematurely.", question: "What is `break`?" }
            ]
        },
        {
            category: "OOP Pillars",
            questions: [
                { points: 100, answer: "A blueprint or template for creating objects.", question: "What is a Class?" },
                { points: 200, answer: "This special method shares the class name and initializes a new object.", question: "What is a Constructor?" },
                { points: 300, answer: "Bundling data and methods together, controlling access with getters/setters.", question: "What is Encapsulation?" },
                { points: 400, answer: "The principle where a child class acquires properties from a parent class.", question: "What is Inheritance?" },
                { points: 500, answer: "A class that cannot be instantiated and is a template for subclasses.", question: "What is an Abstract Class?" }
            ]
        }
    ];

    const gameBoard = document.getElementById('game-board');
    const modal = document.getElementById('modal');
    const questionText = document.getElementById('question-text');
    const answerText = document.getElementById('answer-text');
    const revealAnswerBtn = document.getElementById('reveal-answer-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Generate the game board
    gameData.forEach((cat) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.textContent = cat.category;
        gameBoard.appendChild(categoryDiv);
    });

    for (let i = 0; i < 5; i++) {
        gameData.forEach((cat, catIndex) => {
            const clue = cat.questions[i];
            const clueDiv = document.createElement('div');
            clueDiv.classList.add('clue');
            clueDiv.textContent = `$${clue.points}`;
            clueDiv.dataset.catIndex = catIndex;
            clueDiv.dataset.clueIndex = i;
            gameBoard.appendChild(clueDiv);
        });
    }

    let activeClue = null;

    // Set the initial state of the modal to be hidden
    modal.style.display = 'none';

    // Event listener for clicking a clue
    gameBoard.addEventListener('click', (e) => {
        if (e.target.classList.contains('clue') && !e.target.classList.contains('answered')) {
            activeClue = e.target;
            const { catIndex, clueIndex } = activeClue.dataset;
            const questionData = gameData[catIndex].questions[clueIndex];

            questionText.textContent = questionData.answer; // Jeopardy "answer"
            answerText.textContent = questionData.question; // Jeopardy "question"

            answerText.classList.add('answer-hidden');
            revealAnswerBtn.style.display = 'block';
            modal.style.display = 'flex'; // Show the modal
        }
    });

    // Event listener for revealing the answer
    revealAnswerBtn.addEventListener('click', () => {
        answerText.classList.remove('answer-hidden');
        revealAnswerBtn.style.display = 'none';
    });

    // Event listener for closing the modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
        if (activeClue) {
            activeClue.classList.add('answered');
            activeClue.textContent = 'DONE';
            activeClue = null;
        }
    });
});