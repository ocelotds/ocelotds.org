# OCELOT
[![](https://badge.imagelayers.io/hhfrancois/ocelotds.org:glassfish.svg)](https://imagelayers.io/?images=hhfrancois/ocelotds.org:glassfish 'Get your own badge on imagelayers.io')
## More  details on [ocelotds.org](http://ocelotds.org)

## The best and easiest communication way between java 7+ and javascript
#### Forget REST, forget AJAX, forget http, forget protocol, Ocelot uses websocket and do everything for you.

#### Forget limitations about number of connections between browsers and backend. At best 6 simultaneous connections.

[Browsers limitations](http://webdebug.net/2013/12/browser-connection-limit)

[HOW TO](https://github.com/hhdevelopment/ocelot/wiki/howto)

Ocelot framework allow to call differents services directly from simple classes methods call, like you can do in the backend.   
Don't write WEB Services, focus on business methods, ocelot do communication between business layout and font-end.

Ocelot allow to implement the Message driven bean paragdim but for javascript with topic destination.   
For push message/object to the client.

**Ocelot use one bidirection connection websocket, and is designed for usage in  single page web application.**

The better way, is doing EJB, CDI Beans annotated, but you can call a simple pojo, or soon spring bean.   
If you use managed classes, you benefits of all features

**Ocelot is develop on reference Java EE server glassfish 4.**
**CDI features, WebSocket features, jsonp features, are provided by glassfish**  

Ocelot can work in servlet container like tomcat without EJB features of course. but requires some extra dependencies and configure them :
 - [cdi](http://docs.jboss.org/weld/reference/1.0.0/en-US/html/environments.html)
 - [jsonp](https://jsonp.java.net/) 

See documentation for [details](http://ocelotds.org).
