# Covid-19-Stats

I created this application using various data from a given data source (API).
On the "history" page, I included the graphs that I considered the most important. I was not sure if the application should show charts from all countries or only from the USA, so I included charts ONLY for the USA from 2020-06-03, because for this country there were the most samples, so the charts display in a good way. I used two different charts as reusable components where I entered data from the arrays. In the future, to add another kind of graph, just add it as a component in the google-charts folder. Graphs can be updated thanks to ngAfteriewInit, but it wasn't necessary.

To display graphs in a good way, Google Charts requires a special data format, so I added some data conversion functions in the utils folder.

I added a sticky "InfoBar", thanks to which you can filter data from any day and from any country. I thought I needed to use the "/ countries" api, so I decided to download countries and display them in the input.

On the "statistics" subpage I put the data from "/statistics". You can filter them by entering the country or sort them by clicking on the table headers.

I used standard routing, without lazy-modules, as there are no administrator functions in this application that would be loaded unnecessarily for a regular user.

I thought about using the classes in the BEM methodology, but finally decided to use the standard, dashed classes.

##Demo
https://stats-cov-19.netlify.app/
