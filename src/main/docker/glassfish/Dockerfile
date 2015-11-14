FROM java:openjdk-8-jdk

MAINTAINER Francois Achache <francois.achache@gmail.com>

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin
ENV MAVEN_VERSION 3.3.3
ENV GLASSFIH_VERSION 4.1.1


RUN curl -fsSL http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar xzf - -C /usr/share \
  && mv /usr/share/apache-maven-$MAVEN_VERSION /usr/share/maven \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn \
  && curl --silent --location --retry 3 https://github.com/hhdevelopment/ocelot/archive/master.tar.gz | tar xz -C /tmp \
  && cd /tmp/ocelot-master && mvn install -Dgpg.skip=true -DskipTests=true \
  && curl --silent --location --retry 3 https://github.com/hhdevelopment/ocelotds.org/archive/master.tar.gz | tar xz -C /tmp \
  && cd /tmp/ocelotds.org-master && mvn package && mv /tmp/ocelotds.org-master/target/ocelotds*.war /tmp/ \
  && rm -rf /tmp/ocelot-master && rm -rf /tmp/ocelotds.org-master && rm -f /usr/bin/mvn && rm -rf /usr/share/maven && rm -rf ~/.m2

ENV GLASSFISH_HOME /usr/local/glassfish4
ENV PATH $PATH:$GLASSFISH_HOME/bin

RUN apt-get update && apt-get install -y curl unzip zip inotify-tools && rm -rf /var/lib/apt/lists/* \
  && curl -L -o /tmp/glassfish-$GLASSFIH_VERSION.zip http://download.java.net/glassfish/$GLASSFIH_VERSION/release/glassfish-$GLASSFIH_VERSION.zip \
  && unzip /tmp/glassfish-$GLASSFIH_VERSION.zip -d /usr/local \
  && rm -f /tmp/glassfish-$GLASSFIH_VERSION.zip

RUN $GLASSFISH_HOME/bin/asadmin start-domain domain1 \
  && echo "AS_ADMIN_USERPASSWORD=demo" > pwd.txt \
  && $GLASSFISH_HOME/bin/asadmin create-file-user --passwordfile=pwd.txt --groups USERGP demo \
  && $GLASSFISH_HOME/bin/asadmin stop-domain domain1 \
  && rm pwd.txt

RUN mv /tmp/ocelot*.war $GLASSFISH_HOME/glassfish/domains/domain1/autodeploy 

EXPOSE 8080 4848 8181

WORKDIR $GLASSFISH_HOME

# verbose mode for foreground mode
CMD asadmin start-domain --verbose domain1

