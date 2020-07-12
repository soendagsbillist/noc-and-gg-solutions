class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

//rectangle for deviding screen into parts
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return(point.x > this.x - this.w &&
	   point.x < this.x + this.w &&
	   point.y > this.y - this.h &&
	   point.y < this.y + this.h);
  }

  intersects(range) {
    return !(range.x - range.w > this.x + this.w ||
	range.x + range.w < this.x - this.w ||
	range.y - range.h > this.y + this.h ||
	range.y + range.h > this.y + this.h);
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point) {
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
    return d <= this.rSquared;
  }

  intersects(range) {

    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);

    let r = this.r;
    let w = range.w;
    let h = range.h;

    let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

    if (xDist > (r + w) || yDist > (r + h))
      return false;

    if (xDist <= w || yDist <= h)
      return true;

    return edges <= this.rSquared;
  }
}

// Rectangle, Int -> QaudTree
class QuadTree {
  constructor(boundary_, capacity_) {
    this.boundary =  boundary_;
    this.capacity = capacity_;
    this.points = [];
    this.devided = false;
  }

  subdivide() {
    let ne = new Rectangle(this.boundary.x + this.boundary.w / 2,
			   this.boundary.y - this.boundary.h / 2,
			   this.boundary.w / 2, this.boundary.h / 2);
    this.northeast = new QuadTree(ne, this.capacity);
    let nw = new Rectangle(this.boundary.x - this.boundary.w / 2,
			   this.boundary.y - this.boundary.h / 2,
			   this.boundary.w / 2, this.boundary.h / 2);
    this.northwest = new QuadTree(nw, this.capacity);
    let se = new Rectangle(this.boundary.x + this.boundary.w / 2,
			   this.boundary.y + this.boundary.h / 2,
			   this.boundary.w / 2, this.boundary.h / 2);
    this.southeast = new QuadTree(se, this.capacity);
    let sw = new Rectangle(this.boundary.x - this.boundary.w / 2,
			   this.boundary.y + this.boundary.h / 2,
			   this.boundary.w / 2, this.boundary.h / 2);
    this.southwest = new QuadTree(sw, this.capacity);

    this.devided = true;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      // takes any rectangle(x,y,w,h) and subdivides it into 4 sections
      if (!this.devided){
	this.subdivide();
      }
      this.northeast.insert(point);
      this.northwest.insert(point);
      this.southeast.insert(point);
      this.southwest.insert(point);
    }

  }

  query(range, found) {
    if (!this.boundary.intersects(range)) {
      return;
    } else {
      for (let p of this.points) {
	if (range.contains(p)) {
          found.push(p);
	}
      }
      if (this.divided) {
	this.northwest.query(range, found);
	this.northeast.query(range, found);
	this.southwest.query(range, found);
	this.southeast.query(range, found);
      }
    }
  }

  render() {
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

    if (this.devided) {
      this.northwest.render();
      this.northeast.render();
      this.southwest.render();
      this.southeast.render();
    }
  }
}
