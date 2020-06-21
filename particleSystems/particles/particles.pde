import java.util.Iterator;
ArrayList<ParticleSystem> systems;
ParticleSystem particles;
Particle p;


void setup() {
    size(640, 320);
    systems = new ArrayList<ParticleSystem>();
}

void draw() {
    background(255);

    for (ParticleSystem ps: systems) {
	if (!(ps.isDead())) {
	    ps.addParticle();
	}
	ps.run();
    }

    Iterator<ParticleSystem> it = systems.iterator();
    while (it.hasNext()) {
    	ParticleSystem ps = it.next();

    	if (ps.isDead() && ps.size() == 0) {
	    it.remove();
    	}
    }

}

class Particle {
    PVector location;
    PVector velocity;
    PVector acceleration;
    float lifespan;

    PVector gravity;

    Particle(PVector l) {
	location = l.get();
	velocity = new PVector(random(-1, 1), random(-2, 0));
	acceleration = new PVector();
	lifespan = 255;
	gravity = new PVector(0, 0.05);
    }

    void run(Particle p) {
	update();
	render();
	p.applyForce(gravity);
    }

    void render() {
	stroke(0, lifespan);
	fill(0, lifespan);
	ellipse(location.x, location.y, 10, 10);
    }

    void update() {
	velocity.add(acceleration);
	location.add(velocity);
	acceleration.mult(0);
	lifespan -= 2.0;
    }

    void applyForce(PVector f) {
	PVector force = f.get();
	acceleration.add(force);
    }

    boolean isDead() {
	if (lifespan < 0.0) {
	    return true;
	} else {
	    return false;
	}
    }
}

class ParticleSystem {
    ArrayList particles;
    PVector origin;
    float lifespan;

    ParticleSystem(PVector location) {
	origin = location.get();
	particles = new ArrayList();
	lifespan = 100;
    }

    void addParticle() {
	particles.add(new Particle(origin));
    }

    void run() {

	Iterator<Particle> it = particles.iterator();

	while(it.hasNext()) {
	    Particle p = it.next();
	    p.run(p);

	    if(p.isDead()) {
		it.remove();
	    }
	}
	lifespan -= 1;
    }

    boolean isDead() {
	if (lifespan < 0) {
	    return true;
	} else {
	    return false;
	}
    }

    int size() {
	return particles.size();
    }
}

void mousePressed() {
    systems.add(new ParticleSystem(new PVector(mouseX, mouseY)));
}
