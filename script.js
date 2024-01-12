document.addEventListener("DOMContentLoaded", function () {
    const pokemonForm = document.getElementById("pokemonForm");
    const imageSelect = document.getElementById("imageSelect");

    pokemonForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        try {
            // Get the entered Pokemon name
            const pokemonName = document.getElementById("pokemonName").value;

            // Make a request to the PokeAPI
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

            if (!response.ok) {
                throw new Error(`Error fetching data from PokeAPI: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            console.log(data);



            document.getElementById("pokemon-image").style.display = 'block';
            document.getElementById("pokemon-info").style.display = 'flex';
            // document.getElementById("pokemon-gif1").style.display = 'flex';


            document.getElementById("pokemonName").placeholder = data.name.charAt(0).toUpperCase() + data.name.slice(1);


            // Update the UI with the retrieved data
            document.getElementById("pokemon-image").src = data.sprites.front_default;
            document.getElementById("pokemon-gif").src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
            document.getElementById("pokemon-title").innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            document.getElementById("pokemon-weight").innerText = data.weight;


            const typesString = data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(", ");
            document.getElementById("pokemon-types").innerText = typesString;


            const statsList = document.getElementById("pokemon-stats");

            // Clear the stats list
            statsList.innerHTML = "";

            // Iterate over the stats and create list items
            data.stats.forEach(stat => {
                const statListItem = document.createElement("li");
                statListItem.innerHTML = `<span class="statTitle">${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}</span>: <span class="statValue">${stat.base_stat}</span>`;
                statsList.appendChild(statListItem);
            });

            // Append the stats list to the UI
            const pokemonInfo = document.getElementById("pokemon-info");
            pokemonInfo.appendChild(statsList);



            imageSelect.addEventListener("change", function (event) {
                if (event.target.value === "front_default") {
                    document.getElementById("pokemon-image").src = data.sprites.front_default;
                } else if (event.target.value === "back_default") {
                    document.getElementById("pokemon-image").src = data.sprites.back_default;
                } else if (event.target.value === "front_shiny") {
                    document.getElementById("pokemon-image").src = data.sprites.front_shiny;
                } else if (event.target.value === "back_shiny") {
                    document.getElementById("pokemon-image").src = data.sprites.back_shiny;
                }
                
            });

        } catch (error) {
            console.error(error);
            alert("Pokemon not found. Please enter a valid Pokemon name.");
        }
        document.getElementById("pokemonForm").reset();
    });
});


